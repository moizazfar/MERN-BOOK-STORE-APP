import React, { useEffect, useState } from "react";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { getAllBooksInAuction, removeFromAuction } from "../api/auction";
import axios from "axios";
import { useSelector } from "react-redux";

function formatDate(isoDate) {
  const date = new Date(isoDate);

  // Get day, month, and year components
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
}

const AllAuctionList = () => {
  const { user } = useSelector((state) => state.auth);

  const [allAuctionBooks, setAllAuctionBooks] = useState([]);

  const getAllAuctionBooks = async () => {
    try {
      const response = await getAllBooksInAuction();

      if (response.success) {
        setAllAuctionBooks(response.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getAllAuctionBooks();
  }, []);

  //   delete book
  const handleDelete = async (id) => {
    try {
      const response = await removeFromAuction(id);
      if (response.success) {
        alert(response.message || "Book delete Successfully from Auction");
        getAuctionBooks();
      }
    } catch (error) {
      console.log(error);
    }

  }
  return (
    <div className="px-4 my-12">
      <h2 className="mb-8 text-3xl font-bold">Auction Books</h2>

      <Table className="lg:w-[1180px]">
        <Table.Head>
          <Table.HeadCell>No.</Table.HeadCell>
          <Table.HeadCell>Book name</Table.HeadCell>
          <Table.HeadCell>Auction Start Date</Table.HeadCell>
          <Table.HeadCell>Auction End Date</Table.HeadCell>
          <Table.HeadCell>
            <span>Actions</span>
          </Table.HeadCell>
        </Table.Head>
        {allAuctionBooks.map((book, index) => (
          <Table.Body className="divide-y" key={book._id}>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {index + 1}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {book.title}
              </Table.Cell>
              <Table.Cell>{formatDate(book.auctionStartDate)}</Table.Cell>
              <Table.Cell>{formatDate(book.auctionEndDate)}</Table.Cell>
              <Table.Cell>
                <button
                  onClick={() => handleDelete(book._id)}
                  className="bg-red-600 px-4 py-1 font-semibold text-white rounded-sm hover:bg-sky-600"
                >
                  Delete
                </button>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        ))}
      </Table>
    </div>
  );
};

export default AllAuctionList;
