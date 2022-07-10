import axios from "axios";

const SEARCH_API = "http://localhost:8000/search/index.xml";
// const SEARCH_API = "http://localhost:8000/search.xml?q=Ender
export const
  getBooks = (keyword) =>
  axios.get(`${SEARCH_API}?q=${keyword}`);
