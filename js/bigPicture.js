import { isEscapeKey } from './util.js';

const bigPictureElement = document.querySelector('.big-picture');
const commentCountElement = bigPictureElement.querySelector('.social__comment-count');
const commentListElement = bigPictureElement.querySelector('.social__comments');
const commentsLoaderElement = document.querySelector('.comments-loader');
const closeButtonElement = document.querySelector('.big-picture__cancel');
const commentElement = commentListElement.querySelector('.social__comment');

//заполняем данные из объекта, который использовался для отображения миниатюры
const renderPictureDetails = ({ url, description, likes}) => {
  const bigPictureImg = bigPictureElement.querySelector('.big-picture__img img');
  const bigPictureLikes = bigPictureElement.querySelector('.likes-count');
  const bigPictureDescription = bigPictureElement.querySelector('.social__caption');

  bigPictureImg.src = url;
  bigPictureImg.alt = description;
  bigPictureLikes.textContent = likes;
  bigPictureDescription.textContent = description;
};

//создаем комментарии
const createCommentsList = ({avatar, message, name}) => {
  const comment = commentElement.cloneNode(true);
  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

//добавляем комментарии в разметку
const renderComments = (comments) => {
  commentListElement.innerHTML = '';

  const fragment = document.createDocumentFragment();
  comments.forEach((item) => {
    const comment = createCommentsList(item);
    fragment.append(comment);
  });
  commentListElement.append(fragment);
};

//открываем миниатюру
const openBigPicture = (data) => {
  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  commentCountElement.classList.add('hidden');
  commentsLoaderElement.classList.add('hidden');
  document.addEventListener('keydown', onBigPictureEscKeydown);

  renderPictureDetails(data);
  renderComments(data.comments);
};

//скрываем окно с изображением
const hideBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onBigPictureEscKeydown);
};

const onCloseButtonClick = () => {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onBigPictureEscKeydown);
};

closeButtonElement.addEventListener('click', onCloseButtonClick);

function onBigPictureEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideBigPicture();
  }
}

export { openBigPicture };
