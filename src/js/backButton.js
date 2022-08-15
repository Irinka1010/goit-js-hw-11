import { refs } from '../index';
function trackScroll() {
  const scroll = window.pageYOffset;
  const coords = document.documentElement.clientHeight;
  if (scroll > coords) {
    refs.goTopBtn.classList.add('button_to_top-show');
  }
  if (scroll < coords) {
    refs.goTopBtn.classList.remove('button_to_top-show');
  }
}
function backToTop() {
  if (window.pageYOffset > 0) {
    window.scrollBy(0, -80);
    setTimeout(backToTop, 0);
  }
}
export { trackScroll, backToTop };
