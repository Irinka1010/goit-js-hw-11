import { refs } from './js/getRefs';
import fetchImages from './js/fetch-images';
import { backToTop, trackScroll } from './js/backButton';
import { createCollection } from './js/createCollection';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import NewApiService from './js/fetch-images';

const newsApiService = new NewApiService();
const simpleLightbox = new SimpleLightbox('.gallery a');
simpleLightbox.refresh();

refs.form.addEventListener('submit', onSearchForm);
refs.btLoadMore.addEventListener('click', onLoadMore);
window.addEventListener('scroll', trackScroll);
refs.goTopBtn.addEventListener('click', backToTop);

function onSearchForm(event) {
  event.preventDefault();

  newsApiService.query = event.currentTarget.searchQuery.value.trim();
  if (newsApiService.query === '') {
    Notify.failure('Please enter the name of the picture.');
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
        return;
      } else if (
        newsApiService.page < Math.ceil(data.totalHits / newsApiService.perPage)
      ) {
        clearGallery();
        createCollection(data.hits);
        simpleLightbox.refresh();
        Notify.success(`Hooray! We found ${data.totalHits} images.`);
        refs.btLoadMore.classList.remove('is-hidden');
      } else if (
        newsApiService.page >=
        Math.ceil(data.totalHits / newsApiService.perPage)
      ) {
        clearGallery();
        createCollection(data.hits);
        simpleLightbox.refresh();
        refs.btLoadMore.classList.add('is-hidden');
        Notify.success(
          "We're sorry, but you've reached the end of search results"
        );
      } else {
        Notify.failure('Unknown error');
      }
    })
    .catch(handleError);
}
function onLoadMore() {
  newsApiService.fetchImages().then(({ data }) => {
    createCollection(data.hits);
    onPageScrolling();
    simpleLightbox.refresh();
    if (
      newsApiService.page === Math.ceil(data.totalHits / newsApiService.perPage)
    ) {
      refs.btLoadMore.classList.add('is-hidden');
      Notify.success(
        "We're sorry, but you've reached the end of search results"
      );
    }
  });
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}
function handleError() {
  console.log(error);
}

function onPageScrolling() {
  const { height: cardHeight } =
    refs.gallery.firstElementChild.getBoundingClientRect();
  window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
}
