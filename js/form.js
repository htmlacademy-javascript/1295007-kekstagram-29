import { isEscapeKey, toggleBody } from './util.js';
import { resetScale } from './scale.js';
import {
  destroySlider,
  createSlider,
  startConfigsSlider,
  imagePreviewElement
} from './slider.js';

const VALID_HASHTAG = /^#[a-zа-яë0-9]{1,19}$/i;
const MAX_COUNT_HASHTAG = 5;
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const ERROR_TEXT = {
  invalidCount: `Укажите максимум ${MAX_COUNT_HASHTAG} хэш-тегов`,
  invalidHashtag: 'Введён невалидный хэш-тег',
  notUnique: 'Хэш-теги повторяются'
};

const SubmitButtonText = {
  STANDARD: 'Опубликовать',
  SENDING: 'Публикуем...'
};

const uploadFormElement = document.querySelector('.img-upload__form');
const fileFieldElement = uploadFormElement.querySelector('.img-upload__input');
const uploadOverlayElement = uploadFormElement.querySelector('.img-upload__overlay');
const closeButtonElement = uploadFormElement.querySelector('.img-upload__cancel');
const hashtagFieldElement = uploadFormElement.querySelector('.text__hashtags');
const commentFieldElement = uploadFormElement.querySelector('.text__description');
const submitButtonElement = uploadFormElement.querySelector('.img-upload__submit');
const effectsContainerElement = document.querySelectorAll('.effects__preview');

const pristine = new Pristine(uploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const openModal = () => {
  uploadOverlayElement.classList.remove('hidden');
  commentFieldElement.textContent = '';
  createSlider();
  startConfigsSlider();
  toggleBody();
  document.addEventListener('keydown', onModalKeydown);
};

const hideModal = () => {
  uploadFormElement.reset();
  resetScale();
  destroySlider();
  pristine.reset();
  uploadOverlayElement.classList.add('hidden');
  toggleBody();
  document.removeEventListener('keydown', onModalKeydown);
};

const normalizeHashtags = (hashtagString) => hashtagString.trim().split(' ').filter((hashtag) => Boolean(hashtag.length));

// Проверка на валидность
const validateHashtag = (value) => normalizeHashtags(value).every((item) => VALID_HASHTAG.test(item));

pristine.addValidator(
  hashtagFieldElement,
  validateHashtag,
  ERROR_TEXT.invalidHashtag,
  2,
  true
);

//Проверка на количество хэш-тегов
const validateCountHashtag = (value) => normalizeHashtags(value).length <= MAX_COUNT_HASHTAG;

pristine.addValidator(
  hashtagFieldElement,
  validateCountHashtag,
  ERROR_TEXT.invalidCount,
  3,
  true
);

// Проверка на уникальность (без повторения)
const validateUniqueHashtag = (hashtagString) => {
  const lowerCaseHashtags = normalizeHashtags(hashtagString).map((value) => value.toLowerCase());
  return lowerCaseHashtags.length === new Set(lowerCaseHashtags).size;
};

pristine.addValidator(
  hashtagFieldElement,
  validateUniqueHashtag,
  ERROR_TEXT.notUnique,
  1,
  true
);

const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = SubmitButtonText.STANDARD;
};

const setUserFormSubmit = (cb) => {
  uploadFormElement.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      await cb(new FormData(uploadFormElement));
      unblockSubmitButton();
    }
  });
};

const onFileFieldChange = () => openModal();

fileFieldElement.addEventListener('change', () => {
  const file = fileFieldElement.files[0];
  const fileName = file.name.toLowerCase();

  const compare = FILE_TYPES.some((value) => fileName.endsWith(value));
  if (compare) {
    imagePreviewElement.src = URL.createObjectURL(file);
    effectsContainerElement.forEach((item) => {
      item.style.backgroundImage = `url('${imagePreviewElement.src}')`;
    });
    onFileFieldChange();
  }
});

function onModalKeydown(evt) {
  if (isEscapeKey(evt) && !(document.activeElement === hashtagFieldElement || document.activeElement === commentFieldElement)) {
    evt.preventDefault();
    if (!(document.querySelector('.success') || document.querySelector('.error'))) {
      hideModal();
    }
  }
}

const onCloseButtonClick = () => hideModal();
closeButtonElement.addEventListener('click', onCloseButtonClick);

export { setUserFormSubmit, hideModal };
