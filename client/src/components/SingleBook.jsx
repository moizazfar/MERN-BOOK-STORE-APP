import React, { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { getPromotionBookDetail } from "../api/book";

function SingleBook() {
  const { id } = useParams();

  const [book, setBook] = useState({});
  // const { _id, bookTitle, imageURL, category, bookDescription, authorName } = useLoaderData();

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "40px",
    padding: "100px", // Added padding
    Width: "768px",
    margin: "0 auto",
  };

  const imageStyle = {
    height: "auto",
    maxWidth: "100%",
  };

  const titleStyle = {
    fontWeight: "bold",
    fontSize: "1.5rem", // Increased font size
  };

  const categoryStyle = {
    fontSize: "1.2rem", // Increased font size
  };

  const getDetail = async () => {
    try {
      const response = await getPromotionBookDetail(id);
      if (response.success) {
        setBook(response.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getDetail();
  }, []);

  return (
    <div style={containerStyle}>
      <img src={book.image} alt="" style={imageStyle} />
      <h2 style={titleStyle}>{book.title} </h2>
      <h3 style={categoryStyle}>
        Author: <u> {book.authorName}</u> Category: {book.category}
      </h3>
      <h4>{book.description}</h4>
    </div>
  );
}

export default SingleBook;
