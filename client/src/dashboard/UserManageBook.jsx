import React, { useEffect, useState } from "react";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { getBooksByUser, removeBook } from "../api/book";
import axios from "axios";
import { useSelector } from "react-redux";

const UserManageBooks = () => {
  const { user } = useSelector((state) => state.auth);

  const [allBooks, setAllBooks] = useState([]);

  const getBooks = async () => {
    try {
      const response = await getBooksByUser();

      if (response.success) {
        setAllBooks(response.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getBooks();
  }, []);

  //   delete book
  const handleDelete = async (id) => {
    try {
      const response = await removeBook(id);
      if (response.success) {
        alert(response.message || "Book delete Successfully");
        getBooks();
      }
    } catch (error) {
      console.log(error);
    }

    // console.log(id);
    // fetch(`http://localhost:3050/book/${id}`, {
    //   method: "DELETE",
    // })
    //   .then((res) => res.json)
    //   .then((data) => {
    //     alert("Book deleted successfully!!");
    //     // setAllBooks(data);
    //   });
  };

  return (
    <div className="px-4 my-12">
      <h2 className="mb-8 text-3xl font-bold">ManageBooks</h2>

      <Table className="lg:w-[1180px]">
        <Table.Head>
          <Table.HeadCell>No.</Table.HeadCell>
          <Table.HeadCell>Book name</Table.HeadCell>
          <Table.HeadCell>Author name</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Prices</Table.HeadCell>
          <Table.HeadCell>
            <span>Edit or Manage</span>
          </Table.HeadCell>
        </Table.Head>
        {allBooks.map((book, index) => (
          <Table.Body className="divide-y" key={book._id}>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {index + 1}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {book.title}
              </Table.Cell>
              <Table.Cell>{book.authorName}</Table.Cell>
              <Table.Cell>{book.category}</Table.Cell>
              <Table.Cell>{book.price}</Table.Cell>
              <Table.Cell>
                <Link
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mr-5"
                  to={
                    user.userType == "USER"
                      ? `/user/edit-book/${book._id}`
                      : `/admin/edit-book/${book._id}`
                  }
                >
                  Edit
                </Link>

                {!book.isAuctioned && (
                  <Link
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mr-5"
                    to={
                      user.userType == "USER"
                        ? `/user/auction-book/${book._id}`
                        : `/admin/auction-book/${book._id}`
                    }
                  >
                    Auction
                  </Link>
                )}

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

export default UserManageBooks;
