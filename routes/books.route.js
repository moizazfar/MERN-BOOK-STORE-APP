import express from "express";
const router = express.Router();

import { authProtect } from "../middleware/auth.middleware.js";

import {
  addNewBook,
  getAllBooks,
  getBookById,
  updateBookById,
  removeBookById,
  getAllBooksByUser,
  addBookIntoAuction,
  getAllAuctionedBooks,
  removeBookFromAuction,
  getBookForPromotionById,
  getAllBooksForPromotion,
  getAllAuctionedBooksByUser,
} from "../controllers/books.controller.js";

router.post("/add", authProtect, addNewBook);
router.get("/list-all", authProtect, getAllBooks);
router.get("/list", authProtect, getAllBooksByUser);
router.get("/:id", authProtect, getBookById);
router.put("/update/:id", authProtect, updateBookById);
router.delete("/remove/:id", authProtect, removeBookById);

router.get("/all/promotion", getAllBooksForPromotion);
router.get("/promotion/:id", getBookForPromotionById);

// auction
router.post("/auction/add", authProtect, addBookIntoAuction);
router.get("/auction/list-all", authProtect, getAllAuctionedBooks);
router.get("/auction/list", authProtect, getAllAuctionedBooksByUser);
router.delete("/auction/remove/:id", authProtect, removeBookFromAuction);

export default router;
