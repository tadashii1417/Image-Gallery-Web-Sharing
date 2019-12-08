import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:80/Gallery-Web-Back-End/api"
});
