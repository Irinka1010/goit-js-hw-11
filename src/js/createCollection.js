export { createCollection };
import { refs } from '../index';
function createCollection(items) {
  const markup = items
    .map(item => {
      const {
        id,
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = item;
      return `
    <a class="gallery__link" href="${largeImageURL}">
    <div class="photo-card" id=${id}>
  <img class="gallery-item__img"  src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${likes}
    </p>
    <p class="info-item">
      <b>Views</b>${views}
    </p>
    <p class="info-item">
      <b>Comments</b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${downloads}
    </p>
    </div>
    </div>
    </a>`;
    })
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}
