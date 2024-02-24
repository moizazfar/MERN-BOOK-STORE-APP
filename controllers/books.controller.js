import { Book } from "./../models/book.schema.js";

const addNewBook = async (req, res) => {
  try {
    const { title, price, image, category, authorName, description } = req.body;

    if (
      !title ||
      !price ||
      !image ||
      !category ||
      !authorName ||
      !description
    ) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "All fields are required",
      });
    }

    const bookExist = await Book.findOne({ title: title });

    if (bookExist) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Book title should be unique; this title is already taken",
      });
    }

    const newBook = await Book({
      title,
      price,
      image,
      category,
      authorName,
      description,
      user: req.user._id,
    });

    await newBook.save();

    return res.status(201).json({
      status: 201,
      success: true,
      message: "Book added successfully.",
      data: newBook,
    });
  } catch (error) {
    console.error("Error adding new book:", error);
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const allBooks = await Book.find();

    return res.status(200).json({
      status: 200,
      success: true,
      data: allBooks,
    });
  } catch (error) {
    console.error("Error fetching all books:", error);
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getAllBooksByUser = async (req, res) => {
  try {
    const allBooks = await Book.find({ user: req.user._id });
    return res.status(200).json({
      status: 200,
      success: true,
      data: allBooks,
    });
  } catch (error) {
    console.error("Error fetching books by user:", error);
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getBookById = async (req, res) => {
  try {
    const { id: bookId } = req.params;

    if (!bookId)
      return res.status(400).json({
        status: 400,
        success: false,
        message: "bookID is required",
      });

    const getBookFromDB = await Book.findById({ _id: bookId });

    if (!getBookFromDB)
      return res.status(404).json({
        status: 404,
        success: false,
        message: "Book not found",
      });

    return res.status(200).json({
      status: 200,
      success: true,
      data: getBookFromDB,
    });
  } catch (error) {
    console.error("Error fetching book by ID:", error);
    res.status(500).json({
      status: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
};

const updateBookById = async (req, res) => {
  try {
    const { id: bookId } = req.params;
    const { title, price, image, category, authorName, description } = req.body;

    if (!bookId)
      return res.status(400).json({
        status: 400,
        success: false,
        message: "bookID is required",
      });

    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      {
        title,
        price,
        image,
        category,
        authorName,
        description,
      },
      { new: true }
    );

    if (!updatedBook)
      return res.status(404).json({
        status: 404,
        success: false,
        message: "Book not found",
      });

    return res.status(200).json({
      status: 200,
      success: true,
      data: updatedBook,
    });
  } catch (error) {
    console.error("Error updating book by ID:", error);
    res.status(500).json({
      status: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
};

const removeBookById = async (req, res) => {
  try {
    const { id: bookId } = req.params;

    if (!bookId)
      return res.status(400).json({
        status: 400,
        success: false,
        message: "bookID is required",
      });

    const deletedBook = await Book.findByIdAndDelete(bookId);

    if (!deletedBook)
      return res.status(404).json({
        status: 404,
        success: false,
        message: "Book not found",
      });

    return res.status(200).json({
      status: 200,
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting book by ID:", error);
    res.status(500).json({
      status: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getAllBooksForPromotion = async (req, res) => {
  console.log("hey");
  try {
    const allBooks = await Book.find().select(
      "-isAuctioned -auctionStartDate -auctionEndDate -description"
    );

    return res.status(200).json({
      status: 200,
      success: true,
      data: allBooks,
    });
  } catch (error) {
    console.error("Error fetching books for promotion:", error);
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getBookForPromotionById = async (req, res) => {
  try {
    const { id: bookId } = req.params;

    if (!bookId)
      return res.status(400).json({
        status: 400,
        success: false,
        message: "bookID is required",
      });

    const getBookFromDB = await Book.findById({ _id: bookId }).select(
      "title authorname category image description _id"
    );

    if (!getBookFromDB)
      return res.status(404).json({
        status: 404,
        success: false,
        message: "Book not found",
      });

    return res.status(200).json({
      status: 200,
      success: true,
      data: getBookFromDB,
    });
  } catch (error) {
    console.error("Error fetching book by ID:", error);
    res.status(500).json({
      status: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
};

// auction
const addBookIntoAuction = async (req, res) => {
  try {
    const { bookId, auctionStartDate, auctionEndDate } = req.body;
    const userId = req.user._id;

    if (!bookId || !auctionStartDate || !auctionEndDate) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "bookId, auctionStartDate, and auctionEndDate are required",
      });
    }

    const bookToUpdate = await Book.findOne({ _id: bookId, user: userId });

    if (!bookToUpdate) {
      return res.status(403).json({
        status: 403,
        success: false,
        message: "Unauthorized: You do not have permission to update this book",
      });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      {
        $set: {
          auctionStartDate,
          auctionEndDate,
          isAuctioned: true,
        },
      },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "Book not found",
      });
    }

    return res.status(200).json({
      status: 200,
      success: true,
      data: updatedBook,
    });
  } catch (error) {
    console.error("Error adding book to auction:", error);
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getAllAuctionedBooks = async (req, res) => {
  try {
    const auctionedBooks = await Book.find({ isAuctioned: true });
    return res.status(200).json({
      status: 200,
      success: true,
      data: auctionedBooks,
    });
  } catch (error) {
    console.error("Error fetching auctioned books:", error);
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getAllAuctionedBooksByUser = async (req, res) => {
  try {
    const userId = req.user._id;

    const auctionedBooksForUser = await Book.find({
      user: userId,
      isAuctioned: true,
    });

    return res.status(200).json({
      status: 200,
      success: true,
      data: auctionedBooksForUser,
    });
  } catch (error) {
    console.error("Error fetching auctioned books for user:", error);
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
};

const removeBookFromAuction = async (req, res) => {
  try {
    const { id: bookId } = req.params;
    const userId = req.user._id;

    if (!bookId)
      return res.status(400).json({
        status: 400,
        success: false,
        message: "bookId is required",
      });

    // Check if the user has permission to remove the book from auction
    const bookToRemove = await Book.findOne({
      _id: bookId,
      user: userId,
    });

    if (!bookToRemove) {
      return res.status(403).json({
        status: 403,
        success: false,
        message:
          "Unauthorized: You do not have permission to remove this book from auction",
      });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      {
        $set: {
          auctionStartDate: null,
          auctionEndDate: null,
          isAuctioned: false,
        },
      },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "Book not found",
      });
    }

    return res.status(200).json({
      status: 200,
      success: true,
      data: updatedBook,
    });
  } catch (error) {
    console.error("Error removing book from auction:", error);
    return res.status(500).json({
      status: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
};

export {
  addNewBook,
  getAllBooks,
  getBookById,
  updateBookById,
  removeBookById,
  getAllBooksByUser,
  getBookForPromotionById,
  getAllBooksForPromotion,

  // auction
  addBookIntoAuction,
  getAllAuctionedBooks,
  removeBookFromAuction,
  getAllAuctionedBooksByUser,
};
