import { post, put, get, del } from "../services/httpService";

export const addBook = async (data) => {
  const response = await post("/book/add", data);
  return response;
};

export const getAllBooks = async () => {
  const response = await get("/book/list-all");
  return response;
};

export const getBooksByUser = async () => {
  const response = await get("/book/list");
  return response;
};

export const getBookById = async (bookId) => {
  const response = await get(`/book/${bookId}`);
  return response;
};

export const updateBook = async ({ bookId, data }) => {
  const response = await put(`/book/update/${bookId}`, data);
  return response;
};

export const removeBook = async (bookId) => {
  const response = await del(`/book/remove/${bookId}`);
  return response;
};

export const getPromotionBooks = async () => {
  const response = await get(`/book/all/promotion`);
  return response;
};

export const getPromotionBookDetail = async (bookId) => {
  const response = await get(`/book/promotion/${bookId}`);
  return response;
};
