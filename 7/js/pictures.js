export const createPictures = (pictureElements) => {
  const picturesContainer = document.querySelector('.pictures');
  const pictureElementTemplate = document.querySelector('#picture')
    .content.querySelector('.picture');

  const picturesListFragment = document.createDocumentFragment();

  pictureElements.forEach(({url, description, likes, comments}) => {
    const pictureElement = pictureElementTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__info').querySelector('.picture__comments').textContent = likes;
    pictureElement.querySelector('.picture__info').querySelector('.picture__likes').textContent = comments.length;
    picturesListFragment.appendChild(pictureElement);
  });

  picturesContainer.append(picturesListFragment);
};
