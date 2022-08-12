import fetchImages from './js/fetch-images';
import { createCollection } from './js/createCollection';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import NewApiService from './js/fetch-images';

export { refs };
const refs = {
  form: document.querySelector('#search-form'),
  submit: document.querySelector('.submit-form'),
  gallery: document.querySelector('.gallery'),
  btLoadMore: document.querySelector('.load-more'),
};
const newsApiService = new NewApiService();

let simpleLightbox = new SimpleLightbox('.gallery a');
simpleLightbox.refresh();

refs.form.addEventListener('submit', onSearchForm);
refs.btLoadMore.addEventListener('click', onLoadMore);
function onSearchForm(event) {
  event.preventDefault();

  newsApiService.query = event.currentTarget.searchQuery.value.trim();
  if (!newsApiService.query) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  newsApiService.resetPage();

  newsApiService
    .fetchImages()
    .then(({ data }) => {
      if (data.totalHits === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        clearGallery();

        createCollection(data.hits);
        simpleLightbox.refresh();
        Notify.success(`Hooray! We found ${data.totalHits} images.`);
      }
      if (
        newsApiService.page < Math.ceil(data.totalHits / newsApiService.perPage)
      ) {
        refs.btLoadMore.classList.remove('is-hidden');
      } else {
        refs.btLoadMore.classList.add('is-hidden');
      }
    })

    .catch(error => console.log(error));
}
function onLoadMore() {
  newsApiService.fetchImages().then(({ data }) => {
    createCollection(data.hits);
    simpleLightbox.refresh();
  });
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}
