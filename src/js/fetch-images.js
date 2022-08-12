import axios from 'axios';
export { fetchImages };
axios.defaults.baseURL = 'https://pixabay.com/api';
const KEY_API = '29199208-e8f4a754c941d66b2576f6db3';
const FILTER_RESPONSE =
  'image_type=photo&orientation=horizontal&safesearch=true';

async function fetchImages(query, page, perPage) {
  const respons = await axios.get(
    `?key=${KEY_API}&q=${query}&${FILTER_RESPONSE}&page=${page}&per_page=${perPage}`
  );
  return respons;
}
