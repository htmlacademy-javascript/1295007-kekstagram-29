export const createPictures = (pictureElements) => {
  const picturesContainer = document.querySelector('.pictures');
  const pictureElementTemplate = document.querySelector('#picture')
    .content.querySelector('.picture');

  const picturesListFragment = document.createDocumentFragment();

  pictureElements.forEach((element) => {
    const pictureElement = pictureElementTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = element.url;
    pictureElement.querySelector('.picture__img').alt = element.description;
    pictureElement.querySelector('.picture__info').querySelector('.picture__comments').textContent = element.likes;
    pictureElement.querySelector('.picture__info').querySelector('.picture__likes').textContent = element.comments.length;
    picturesListFragment.appendChild(pictureElement);
  });

  picturesContainer.append(picturesListFragment);
};
