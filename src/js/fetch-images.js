import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api';
const KEY_API = '29199208-e8f4a754c941d66b2576f6db3';
const FILTER_RESPONSE =
  'image_type=photo&orientation=horizontal&safesearch=true';

export default class NewApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 40;
  }
  async fetchImages() {
    try {
      const respons = await axios.get(
        `?key=${KEY_API}&q=${this.searchQuery}&${FILTER_RESPONSE}&page=${this.page}&per_page=${this.perPage}`
      );
      if (respons.status === 200) {
        this.incrementPege();
      }

      return respons;
    } catch (error) {
      console.log(error);
    }
  }

  incrementPege() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
