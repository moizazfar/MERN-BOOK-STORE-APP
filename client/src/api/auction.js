import { post, get, del } from "../services/httpService";

export const addBookInAuction = async (data) => {
  const response = await post("/book/auction/add", data);
  return response;
};

export const getAllBooksInAuction = async () => {
  const response = await get("/book/auction/list-all");
  return response;
};

export const getAllBooksInAuctionByUser = async () => {
  const response = await get("/book/auction/list");
  return response;
};

export const removeFromAuction = async (bookId) => {
  const response = await del(`/book/auction/remove/${bookId}`);
  return response;
};
