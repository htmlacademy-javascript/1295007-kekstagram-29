import { isEscapeKey, toggleBody } from './util.js';

const bigPictureElement = document.querySelector('.big-picture');
const commentShownCountElement = bigPictureElement.querySelector('.comments-shown');
const commentCountElement = bigPictureElement.querySelector('.comments-count');
const commentListElement = bigPictureElement.querySelector('.social__comments');
const commentsLoaderElement = document.querySelector('.comments-loader');
const closeButtonElement = document.querySelector('.big-picture__cancel');
const commentElement = commentListElement.querySelector('.social__comment');

let commentsShown = 0;
const COMMENTS_LOADING = 5;
let comments = [];

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

//добавляем комментарии к фотографии
const renderComments = () => {
  commentsShown += COMMENTS_LOADING;

  if (commentsShown >= comments.length) {
    commentsLoaderElement.classList.add('hidden');
    commentsShown = comments.length;
  } else {
    commentsLoaderElement.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  const slicedComments = comments.slice(0, commentsShown);

  slicedComments.forEach((comment) => {
    const newComment = createCommentsList(comment);
    fragment.append(newComment);
  });

  commentListElement.innerHTML = '';
  commentListElement.append(fragment);
  commentShownCountElement.textContent = commentsShown;
  commentCountElement.textContent = comments.length;
};

//открываем миниатюру
const openBigPicture = (data) => {
  bigPictureElement.classList.remove('hidden');
  toggleBody();
  commentsLoaderElement.classList.add('hidden');
  document.addEventListener('keydown', onBigPictureEscKeydown);

  renderPictureDetails(data);
  comments = data.comments;
  if (comments.length > 0) {
    renderComments();
  }
};

//скрываем окно с изображением
const hideBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  toggleBody();
  document.removeEventListener('keydown', onBigPictureEscKeydown);
  commentsShown = 0;
};

function onBigPictureEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideBigPicture();
  }
}

const onCloseButtonClick = () => hideBigPicture();
const onCommentsLoaderClick = () => renderComments();

closeButtonElement.addEventListener('click', onCloseButtonClick);
commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);

export { openBigPicture };
