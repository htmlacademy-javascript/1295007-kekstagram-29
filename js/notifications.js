import { isEscapeKey } from './util.js';

const successPopupElement = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const successButtonElement = successPopupElement.querySelector('.success__button');
const errorPopupElement = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const errorButtonElement = errorPopupElement.querySelector('.error__button');
const bodyElement = document.body;

function deleteMessage() {
  const messageElement = document.querySelector('.success') || document.querySelector('.error');
  messageElement.remove();
  document.removeEventListener('keydown', onMessageKeydown);
  bodyElement.removeEventListener('click', onOverlayClick);
}

const showMessagePopup = (popup, closeButton) => {
  bodyElement.append(popup);
  document.addEventListener('keydown', onMessageKeydown);
  bodyElement.addEventListener('click', onOverlayClick);
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

const showSuccessPopup = () => showMessagePopup(successPopupElement, successButtonElement);
const showErrorPopup = () => showMessagePopup(errorPopupElement, errorButtonElement);

export { showSuccessPopup, showErrorPopup };
