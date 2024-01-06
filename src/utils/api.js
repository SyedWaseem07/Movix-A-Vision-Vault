import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3"
const API_TOKEN = "?api_key=d4c0f2bec852eec894b556b7901524fc";
const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNGMwZjJiZWM4NTJlZWM4OTRiNTU2Yjc5MDE1MjRmYyIsInN1YiI6IjY1OTY0OWIxYTZjMTA0MTAwMmZhNWVmMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.c9nqLFfEqIaQoSW9wzAhWSHLNQnw69qEKAyA-VsA8LY"
const headers = {
    Authorization: "bearer " + TMDB_TOKEN
}

export const fetchDataFromApi = async (url, params) => {
//     const data = fetch(BASE_URL + url + API_TOKEN)
//   .then((res) => res.json())

  try {
    const {data} = await axios.get(BASE_URL + url, {
        headers,
        params,
    })
    return data
  } catch (error) {
    console.log(error);
    return error;    
  }
  return data;
}
