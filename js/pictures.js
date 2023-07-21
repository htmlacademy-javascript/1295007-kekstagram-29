import { openBigPicture } from './big-picture.js';

const picturesContainer = document.querySelector('.pictures');
const pictureElementTemplate = document.querySelector('#picture')
  .content.querySelector('.picture');
const container = document.querySelector('.pictures');

const sortingElement = document.querySelector('.img-filters');

const Sorting = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

let currentSorting = Sorting.DEFAULT;

let pictures = [];

const createPicture = ({ url, description, likes, comments, id }) => {
  const pictureElement = pictureElementTemplate.cloneNode(true);

  pictureElement.href = url;
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__info').querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__info').querySelector('.picture__comments').textContent = comments.length;
  pictureElement.dataset.id = id;

  return pictureElement;
};

const renderPictures = (data) => {
  container.querySelectorAll('.picture').forEach((item) => item.remove());
  const picturesListFragment = document.createDocumentFragment();
  data
    .forEach((picture) => {
      picturesListFragment.append(createPicture(picture));
    });
  picturesContainer.append(picturesListFragment);
};

const onContainerClick = (evt) => {
  const thumbnail = evt.target.closest('[data-id]');
  if (thumbnail) {
    evt.preventDefault();

    const picture = pictures.find(
      (item) => item.id === parseInt(thumbnail.dataset.id, 10)
    );
    openBigPicture(picture);
  }
};

const renderGallery = (data) => {
  renderPictures(data);
  container.addEventListener('click', onContainerClick);
};

const getSortingPictures = () => {
  if (currentSorting === Sorting.RANDOM) {
    return [...pictures].sort(() => Math.random() - 0.5).slice(0, 10);
  } else if (currentSorting === Sorting.DISCUSSED) {
    return [...pictures].sort((a, b) => (b.comments.length - a.comments.length));
  } else {
    return [...pictures];
  }
};

const changeOnSortingClick = (cb) => {
  sortingElement.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }

    if (evt.target.id === currentSorting) {
      return;
    }

    sortingElement.querySelector('.img-filters__button--active')
      .classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
    currentSorting = evt.target.id;
    cb(getSortingPictures());
  });
};

const preparingDataForSorting = (data, cb) => {
  sortingElement.classList.remove('img-filters--inactive');
  pictures = [...data];
  changeOnSortingClick(cb);
};

export { renderGallery, renderPictures, getSortingPictures, preparingDataForSorting };
