import { refs } from './js/getRefs';
import fetchImages from './js/fetch-images';
import { backToTop, trackScroll } from './js/backButton';
import { createCollection } from './js/createCollection';
import axios from 'axios';
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

async function onSearchForm(event) {
  event.preventDefault();

  newsApiService.query = event.currentTarget.searchQuery.value.trim();
  if (newsApiService.query === '') {
    Notify.failure('Please enter the name of the picture.');
    return;
  } else {
    clearGallery();
    onHideButton();
    newsApiService.resetPage();

    try {
      const { hits, totalHits } = await newsApiService.fetchImages();
      if (totalHits === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }
      countAndIncrementPages(totalHits);
      clearGallery();
      createCollection(hits);
      simpleLightbox.refresh();
      Notify.success(`Hooray! We found ${totalHits} images.`);
    } catch (error) {
      console.log(error.message);
    }
  }
}
async function onLoadMore() {
  const { hits, totalHits } = await newsApiService.fetchImages();
  try {
    createCollection(hits);
    onPageScrolling();
    simpleLightbox.refresh();
    countAndIncrementPages(totalHits);
  } catch (error) {
    console.log(error.message);
  }
}

function countAndIncrementPages(amount) {
  const pageAmount = Math.ceil(amount / 40);
  const currentPage = newsApiService.page;

  if (currentPage === pageAmount) {
    onHideButton();
    Notify.info("We're sorry, but you've reached the end of search results.");
    return;
  }
  onShowsButton();
  newsApiService.incrementPege();
  return;
}

function onHideButton() {
  refs.btLoadMore.classList.add('is-hidden');
}
function onShowsButton() {
  refs.btLoadMore.classList.remove('is-hidden');
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
