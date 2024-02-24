import React, { useState, useEffect } from "react";
import BookCards from "../components/BookCards";
import { getPromotionBooks } from "../api/book";

const OtherBooks = () => {
  const [allBooks, setAllBooks] = useState([]);

  const getBooks = async () => {
    try {
      const response = await getPromotionBooks();

      if (response.success) {
        setAllBooks(response.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div>
      <BookCards books={allBooks} headline="Other Books" />
    </div>
  );
};

export default OtherBooks;
