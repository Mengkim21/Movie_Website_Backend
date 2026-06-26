import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();

const tmdbClient = axios.create({
  baseURL: 'http://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
    accept: 'application/json'
  }
})

// axios
//   .request(tmdbClient)
//   .then(res => console.log(res.data))
//   .catch(res => console.error());

export default tmdbClient;