import axios from "axios";

export default axios.create({
  baseURL:
    "https://api.github.com/repos/Antibreez/test-json/contents/flights.json",
  headers: { "Content-Type": "application/json" },
});
