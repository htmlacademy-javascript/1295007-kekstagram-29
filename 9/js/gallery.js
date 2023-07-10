import { renderPictures } from './pictures.js';
import { openBigPicture } from './bigPicture.js';

const container = document.querySelector('.pictures');

const renderGallery = (pictures) => {
  container.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-id]');
    if (!thumbnail) {
      return;
    }
    evt.preventDefault();

    const picture = pictures.find((item) => item.id === parseInt(thumbnail.dataset.id, 10));
    openBigPicture(picture);
  });
  renderPictures(pictures);
};

export { renderGallery };
