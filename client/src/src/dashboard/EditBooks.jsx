import React, { useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import {
  Button,
  Checkbox,
  Label,
  Select,
  TextInput,
  Textarea,
} from "flowbite-react";

const EditBooks = () => {
  const { id } = useParams();
  const {
    bookTitle,
    authorName,
    imageURL,
    category,
    bookDescription,
    bookPDFURL,
  } = useLoaderData();

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

  // Handler for changing selected book category
  const handleChangeSelectedValue = (event) => {
    console.log(event.target.value);
    setSelectedBooksCategories(event.target.value);
  };

  // Handler for toggling the auction checkbox
  const handleAuctionToggle = () => {
    setIncludeInAuction(!includeInAuction);
  };

  // Form submission handler
  const handleUpdate = (event) => {
    event.preventDefault();

    const form = event.target;
    const bookTitle = form.bookTitle.value;
    const authorName = form.authorName.value;
    const imageURL = form.imageURL.value;
    const category = form.categoryName.value;
    const bookDescription = form.bookDescription.value;
    const bookPDFURL = form.bookPDFURL.value;

    // Log book information along with the auction status
    const updateBookObj = {
      bookTitle,
      authorName,
      imageURL,
      bookDescription,
      bookPDFURL,
      category,
      includeInAuction,
    };

    // console.log(bookObj);
    // update a book
    fetch(`http://localhost:3050/book/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updateBookObj),
    })
      .then((res) => res.json)
      .then((data) => {
        // console.log(data)
        alert("Book Updated Successfully!!");
        form.reset();
      });
  };

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
              defaultValue={bookTitle}
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
              defaultValue={authorName}
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
              defaultValue={imageURL}
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
            defaultValue={bookDescription}
          />
        </div>

        {/* book pdf url */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="bookPDFURL" value="Book PDF URL" />
          </div>
          <TextInput
            id="bookPDFURL"
            name="bookPDFURL"
            placeholder="Book PDF URL"
            required
            type="text"
            defaultValue={bookPDFURL}
          />
        </div>

        {/* checkbox */}
        <div className="flex items-center gap-2 mt-5">
          <Checkbox
            id="agree"
            checked={includeInAuction}
            onChange={handleAuctionToggle}
          />
          <Label htmlFor="agree" className="flex">
            Auction
          </Label>
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
