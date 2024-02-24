import React, { useEffect, useState } from "react";
import { Card } from "flowbite-react";
import { Link } from "react-router-dom";
import { getPromotionBooks } from "../api/book";

const Shop = () => {
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
    <div className="mt-28 px-4 lg:px24">
      <h2 className="text-5xl text-center font-bold">All Books are Here</h2>
      <div className="grid gap-8 my-12 lg:grid-cols-4 sm:grid-cols-2 md:grid-col-3 grid-cols-1">
        {allBooks.map((book) => (
          <Link to={`/book/${book._id}`}>
            <Card>
              <img src={book.image} alt="" className="h-95" />
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {book.title}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {book.description}
              </p>
              <button className="bg-blue-700 font-semibold text-white py-2 rounded">
                Buy Now
              </button>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Shop;
