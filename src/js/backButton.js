import { refs } from '../js/getRefs';
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
  window.scroll({
    top: 0,
    behavior: 'smooth',
  });
}
export { trackScroll, backToTop };
