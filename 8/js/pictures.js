const picturesContainer = document.querySelector('.pictures');
const pictureElementTemplate = document.querySelector('#picture')
  .content.querySelector('.picture');

const createPicture = ({ url, description, likes, comments, id }) => {
  const pictureElement = pictureElementTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__info').querySelector('.picture__comments').textContent = likes;
  pictureElement.querySelector('.picture__info').querySelector('.picture__likes').textContent = comments.length;
  pictureElement.dataset.id = id;

  return pictureElement;
};

const renderPictures = (pictures) => {
  const picturesListFragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    picturesListFragment.append(createPicture(picture));
  });
  picturesContainer.append(picturesListFragment);
};

export { renderPictures };
