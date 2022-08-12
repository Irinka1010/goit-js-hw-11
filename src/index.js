import { fetchImages } from './js/fetch-images';
import { createCollection } from './js/createCollection';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export { refs };
const refs = {
  form: document.querySelector('#search-form'),
  submit: document.querySelector('.submit-form'),
  gallery: document.querySelector('.gallery'),
};
let query = '';
let page = 1;
const perPage = 40;

refs.form.addEventListener('submit', onSearchForm);
function onSearchForm(event) {
  event.preventDefault();
  query = event.currentTarget.searchQuery.value;

  fetchImages(query, page, perPage).then(({ data }) =>
    createCollection(data.hits)
  );
}
new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
  captionPosition: 'bottom',
  captionSelector: 'img',
});
