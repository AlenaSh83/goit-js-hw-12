import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton
} from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let currentPage = 1;
let currentQuery = '';
let totalPages = 0;

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

form.addEventListener('submit', async event => {
  event.preventDefault();
  clearGallery();
  hideLoadMoreButton();
  currentPage = 1;
  currentQuery = event.target.elements['search-text'].value.trim();
  if (!currentQuery) return;

  showLoader();
  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    if (data.hits.length === 0) {
      iziToast.error({ message: 'No images found', position: 'topRight' });
      return;
    }

    createGallery(data.hits);
    totalPages = Math.ceil(data.totalHits / 15);

    if (currentPage < totalPages) {
      showLoadMoreButton();
    } else {
      iziToast.info({ message: "You've reached the end of search results.", position: 'topRight' });
    }
  } catch (error) {
    iziToast.error({ message: 'Something went wrong', position: 'topRight' });
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage++;
  showLoader();
  hideLoadMoreButton();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    createGallery(data.hits);

    if (currentPage >= totalPages) {
      iziToast.info({ message: "You've reached the end of search results.", position: 'topRight' });
    } else {
      showLoadMoreButton();
    }

    scrollPage();
  } catch (error) {
    iziToast.error({ message: 'Failed to load more images', position: 'topRight' });
  } finally {
    hideLoader();
  }
});

function scrollPage() {
  const cardHeight = document.querySelector('.gallery-item').getBoundingClientRect().height;
  window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
}
