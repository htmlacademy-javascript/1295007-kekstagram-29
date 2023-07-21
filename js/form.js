import { isEscapeKey, toggleBody } from './util.js';
import { resetScale } from './scale.js';
import {
  destroySlider,
  createSlider,
  startConfigsSlider,
  imagePreviewElement
} from './slider.js';

const uploadForm = document.querySelector('.img-upload__form');
const fileField = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const closeButton = uploadForm.querySelector('.img-upload__cancel');
const hashtagField = uploadForm.querySelector('.text__hashtags');
const commentField = uploadForm.querySelector('.text__description');
const submitButton = uploadForm.querySelector('.img-upload__submit');
const effectsContainer = document.querySelectorAll('.effects__preview');

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

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const openModal = () => {
  uploadOverlay.classList.remove('hidden');
  createSlider();
  startConfigsSlider();
  toggleBody();
  document.addEventListener('keydown', onModalKeydown);
};

const hideModal = () => {
  uploadForm.reset();
  resetScale();
  destroySlider();
  pristine.reset();
  uploadOverlay.classList.add('hidden');
  toggleBody();
  document.removeEventListener('keydown', onModalKeydown);
};

const normalizeHashtags = (hashtagString) => hashtagString.trim().split(' ').filter((hashtag) => Boolean(hashtag.length));

// Проверка на валидность
const validateHashtag = (value) => normalizeHashtags(value).every((item) => VALID_HASHTAG.test(item));

pristine.addValidator(
  hashtagField,
  validateHashtag,
  ERROR_TEXT.invalidHashtag,
  2,
  true
);

//Проверка на количество хэш-тегов
const validateCountHashtag = (value) => normalizeHashtags(value).length <= MAX_COUNT_HASHTAG;

pristine.addValidator(
  hashtagField,
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
  hashtagField,
  validateUniqueHashtag,
  ERROR_TEXT.notUnique,
  1,
  true
);

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.STANDARD;
};

const setUserFormSubmit = (cb) => {
  uploadForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      await cb(new FormData(uploadForm));
      unblockSubmitButton();
    }
  });
};

const onFileFieldChange = () => openModal();

fileField.addEventListener('change', () => {
  const file = fileField.files[0];
  const fileName = file.name.toLowerCase();

  const compare = FILE_TYPES.some((value) => fileName.endsWith(value));
  if (compare) {
    imagePreviewElement.src = URL.createObjectURL(file);
    effectsContainer.forEach((item) => {
      item.style.backgroundImage = `url('${imagePreviewElement.src}')`;
    });
    onFileFieldChange();
  }
});

function onModalKeydown(evt) {
  if (isEscapeKey(evt) && !(document.activeElement === hashtagField || document.activeElement === commentField)) {
    evt.preventDefault();
    if (!(document.querySelector('.success') || document.querySelector('.error'))) {
      hideModal();
    }
  }
}

const onCloseButtonClick = () => hideModal();
closeButton.addEventListener('click', onCloseButtonClick);

export { setUserFormSubmit, hideModal };
