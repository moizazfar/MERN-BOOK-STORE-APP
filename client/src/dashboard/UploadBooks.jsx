import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Label,
  Select,
  TextInput,
  Textarea,
} from "flowbite-react";
import AuctionForm from "./AuctionForm"; // Import the AuctionForm component
import { addBook } from "../api/book";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UploadBooks = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  // Array of book categories
  const bookCategories = [
    "Fiction",
    "Non-Fiction",
    "Programming",
    "Mystery",
    "Science Fiction",
    "Fantasy",
    "Horror",
    "Bibliography",
    "Autobiography",
    "History",
    "Business",
    "Children Books",
    "Travel",
    "Reigion",
    "Art and Design",
  ];

  // State for selected book category
  const [selectedBookCategories, setSelectedBooksCategories] = useState(
    bookCategories[0]
  );

  // State for including a book in auction
  const [includeInAuction, setIncludeInAuction] = useState(false);

  // State for auction details
  const [auctionDetails, setAuctionDetails] = useState({
    startDate: "",
    endDate: "",
  });

  // Handler for changing selected book category
  const handleChangeSelectedValue = (event) => {
    setSelectedBooksCategories(event.target.value);
  };

  // Handler for toggling the auction checkbox
  const handleAuctionToggle = () => {
    setIncludeInAuction(!includeInAuction);
  };

  // Handler for updating auction details
  const handleAuctionDetailsChange = (event) => {
    const { name, value } = event.target;
    setAuctionDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Form submission handler for book
  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    const bookTitle = form.bookTitle.value;
    const authorName = form.authorName.value;
    const imageURL = form.imageURL.value;
    const category = form.categoryName.value;
    const bookDescription = form.bookDescription.value;
    const bookPDFURL = form.bookPDFURL.value;

    // Log book information along with the auction status
    const payload = {
      title: bookTitle,
      authorName,
      image: imageURL,
      description: bookDescription,
      price: bookPDFURL,
      category,
    };

    try {
      const response = await addBook(payload);
      if (response.success) {
        alert(response.message || "Book addedd Successfully");

        if (user?.userType == "USER") {
          navigate("/user/manage");
        } else {
          navigate("/admin/manage");
        }
      }
    } catch (error) {
      alert(error.message);
      console.log(error);
    }

    // // Send book data to the server
    // fetch("http://localhost:3050/upload-book", {
    //   method: "POST",
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    //   body: JSON.stringify(bookObj),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     alert("Book Successfully Added!!");
    //     form.reset();
    //   });
  };

  // Form submission handler for auction
  const handleAuctionSubmit = (event) => {
    event.preventDefault();

    const auctionData = {
      startDate: auctionDetails.startDate,
      endDate: auctionDetails.endDate,
      // Include any additional auction details you need
    };

    // Log auction information
    console.log("Auction Data:", auctionData);

    // Send auction data to the server
    fetch("http://localhost:3050/create-auction", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(auctionData),
    })
      .then((res) => res.json())
      .then((data) => {
        // Add any additional logic after successfully submitting auction data
        alert("Auction Successfully Created!!");
      })
      .catch((error) => {
        console.error("Error submitting auction data:", error);
      });
  };

  return (
    <div className="px-4 my-12">
      <h2 className="mb-8 text-3xl font-bold">Upload A Book</h2>
      <form
        onSubmit={handleSubmit}
        className="flex lg:w-[1180px] flex-col flex-wrap gap-4"
      >
        {/* First row */}
        <div className="flex gap-8">
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="bookTitle" value="Book Title" />
            </div>
            <TextInput
              id="bookTitle"
              name="bookTitle"
              placeholder="Book name"
              required
              type="text"
            />
          </div>

          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="authorName" value="Author Name" />
            </div>
            <TextInput
              id="authorName"
              name="authorName"
              placeholder="Author name"
              required
              type="text"
            />
          </div>
        </div>

        {/* Second row */}
        <div className="flex gap-8">
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="imageURL" value="Book Image URL" />
            </div>
            <TextInput
              id="imageURL"
              name="imageURL"
              placeholder="Book Image URL"
              required
              type="text"
            />
          </div>

          {/* Category */}
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="inputState" value="Book Category" />
            </div>
            <Select
              id="inputState"
              name="categoryName"
              className="w-full rounded"
              value={selectedBookCategories}
              onChange={handleChangeSelectedValue}
            >
              {bookCategories.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </div>
        </div>

        {/* Book Description */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="bookDescription" value="Book Description" />
          </div>
          <Textarea
            id="bookDescription"
            name="bookDescription"
            placeholder="Write your book description..."
            required
            className="w-full"
            rows={6}
          />
        </div>

        {/* Book Price */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="BookPrice" value="Book Price" />
          </div>
          <TextInput
            id="bookPDFURL"
            name="bookPDFURL"
            placeholder="Book Price"
            required
            type="text"
          />
        </div>

        {/* Button for Book Submission */}
        <Button type="submit" className="mt-5">
          Upload Book
        </Button>
      </form>
    </div>
  );
};

export default UploadBooks;
