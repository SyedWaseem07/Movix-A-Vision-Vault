const BASE_URL = "https://api.themoviedb.org/3"
const API_TOKEN = "?api_key=d4c0f2bec852eec894b556b7901524fc";

export const fetchDataFromApi = (url) => {
  const data = fetch(BASE_URL + url + API_TOKEN)
  .then((res) => res.json())
  .then(res => res);
  return data;
}
