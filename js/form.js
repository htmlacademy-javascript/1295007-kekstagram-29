import { isEscapeKey } from './util.js';

const uploadForm = document.querySelector('.img-upload__form');
const fileField = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const closeButton = uploadForm.querySelector('.img-upload__cancel');
const hashtagField = uploadForm.querySelector('.text__hashtags');
const commentField = uploadForm.querySelector('.text__description');

const VALID_HASHTAG = /^#[a-zа-яë0-9]{1,19}$/i;
const MAX_COUNT_HASHTAG = 5;

const ERROR_TEXT = {
  invalidCount: `Укажите максимум ${MAX_COUNT_HASHTAG} хэш-тегов`,
  invalidHashtag: 'Введён невалидный хэш-тег',
  notUnique: 'Хэш-теги повторяются'
};

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const openModal = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onModalKeydown);
};

const hideModal = () => {
  uploadForm.reset();
  pristine.reset();
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onModalKeydown);
};

const normalizeHashtags = (hashtagString) => hashtagString
  .trim().split(' ').filter((hashtag) => Boolean(hashtag.length));

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

const onCloseButtonClick = () => hideModal();
const onFileFieldChange = () => openModal();

const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

fileField.addEventListener('change', onFileFieldChange);
closeButton.addEventListener('click', onCloseButtonClick);
uploadForm.addEventListener('submit', onFormSubmit);

function onModalKeydown(evt) {
  if (isEscapeKey(evt) && !(document.activeElement === hashtagField || document.activeElement === commentField)) {
    evt.preventDefault();
    hideModal();
  }
}
