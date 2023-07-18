import { isEscapeKey } from './util.js';

const successPopup = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const successButton = successPopup.querySelector('.success__button');
const errorPopup = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const errorButton = errorPopup.querySelector('.error__button');
const body = document.body;

function deleteMessage() {
  const messageElement = document.querySelector('.success') || document.querySelector('.error');
  messageElement.remove();
  document.removeEventListener('keydown', onMessageKeydown);
  body.removeEventListener('click', onOverlayClick);
}

const showMessagePopup = (popup, closeButton) => {
  body.append(popup);
  document.addEventListener('keydown', onMessageKeydown);
  body.addEventListener('click', onOverlayClick);
  closeButton.addEventListener('click', deleteMessage);
};

function onMessageKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    deleteMessage();
  }
}

function onOverlayClick(evt) {
  if (evt.target.closest('.success__inner') || evt.target.closest('.error__inner')) {
    return;
  }
  deleteMessage();
}

const showSuccessPopup = () => showMessagePopup(successPopup, successButton);
const showErrorPopup = () => showMessagePopup(errorPopup, errorButton);

export { showSuccessPopup, showErrorPopup };
