import React, { useEffect, useState } from "react";
import { useLoaderData, useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Checkbox,
  Label,
  Select,
  TextInput,
  Textarea,
} from "flowbite-react";
import { getBookById, updateBook } from "../api/book.js";
import { useSelector } from "react-redux";

const EditBooks = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { user } = useSelector((state) => state.auth);

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
  const [fields, setfields] = useState({});
  const [selectedBookCategories, setSelectedBooksCategories] = useState(
    bookCategories[0]
  );

  // State for including a book in auction
  const [includeInAuction, setIncludeInAuction] = useState(false);

  // Handler for changing selected book category
  const handleChangeSelectedValue = (event) => {
    console.log(event.target.value);
    setSelectedBooksCategories(event.target.value);
  };

  // Handler for toggling the auction checkbox
  const handleAuctionToggle = () => {
    setIncludeInAuction(!includeInAuction);
  };

  const handleUpdate = async (event) => {
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
      const response = await updateBook({ bookId: id, data: payload });
      if (response.success) {
        alert(response.message || "Book updated Successfully");

        if (user?.userType == "USER") {
          navigate("/user/manage");
        } else {
          navigate("/admin/manage");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getBook = async () => {
    try {
      const response = await getBookById(id);
      if (response.success) {
        console.log("response.data.data", response.data.data);
        setfields(response?.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  console.log("fields", fields);

  // Form submission handler
  // const handleUpdate = (event) => {
  //   // Log book information along with the auction status
  //   const updateBookObj = {
  //     bookTitle,
  //     authorName,
  //     imageURL,
  //     bookDescription,
  //     bookPDFURL,
  //     category,
  //     includeInAuction,
  //   };

  //   // console.log(bookObj);
  //   // update a book
  //   fetch(`http://localhost:3050/book/${id}`, {
  //     method: "PATCH",
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //     body: JSON.stringify(updateBookObj),
  //   })
  //     .then((res) => res.json)
  //     .then((data) => {
  //       // console.log(data)
  //       alert("Book Updated Successfully!!");
  //       form.reset();
  //     });
  // };

  useEffect(() => {
    getBook();
  }, []);

  return (
    <div className="px-4 my-12">
      <h2 className="mb-8 text-3xl font-bold">Edit A Book</h2>
      <form
        onSubmit={handleUpdate}
        className="flex lg:w-[1180px] flex-col flex-wrap gap-4"
      >
        {/* fisrt row */}
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
              defaultValue={fields?.title}
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
              defaultValue={fields?.authorName}
            />
          </div>
        </div>

        {/* second row */}
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
              defaultValue={fields?.image}
            />
          </div>

          {/* category */}
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

        {/* bookDescription */}
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
            defaultValue={fields?.description}
          />
        </div>

        {/* book price */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="bookPDFURL" value="Book Price" />
          </div>
          <TextInput
            id="bookPDFURL"
            name="bookPDFURL"
            placeholder="Book Price"
            required
            type="text"
            defaultValue={fields?.price}
          />
        </div>

        {/* button */}
        <Button type="submit" className="mt-5">
          Update Book
        </Button>
      </form>
    </div>
  );
};

export default EditBooks;
