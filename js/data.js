import {getRandomInteger,
  getRandomArrayElement,
  createRandomIdFromRangeGenerator
} from './util.js';

const NAME = [
  'Иван',
  'Андрей',
  'Мария',
  'Антон',
  'Клавдия',
  'Инокентий',
];

const DESCRIPTION = [
  'Поймала дзен.',
  'Да, да! В это зеркало я буду фоткаться до тех пор, пока не состарюсь.',
  'Моя жизнь меняется, потому что меняю ее я.',
  'Я, снова я и опять я.',
  'Morning coffee, because anything else is worthless',
  'Live without regrets',
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const AVATAR_COUNTER = {
  min: 1,
  max: 6
};

const LIKES_COUNTER = {
  min: 15,
  max: 200
};

const PHOTOS_COUNT = 25;
const COMMENTS_COUNT = 30;

const generateAvatar = () => `img/avatar-${getRandomInteger(AVATAR_COUNTER.min, AVATAR_COUNTER.max)}.svg`;
const generateUrl = () => `photos/${createRandomIdFromRangeGenerator(1, PHOTOS_COUNT)()}.jpg`;

// Получение одного или двух комментариев
const createMessage = () => {
  const messageCount = getRandomInteger(1, 2);
  const message = [];
  for (let i = 1; i <= messageCount; i++) {
    message.push(getRandomArrayElement(COMMENTS));
  }
  return message.join(' ');
};

// объекты массива — список комментариев, оставленных другими пользователями к фотографии
const createCommentPhoto = () => ({
  id: createRandomIdFromRangeGenerator(1, 100)(),
  avatar: generateAvatar(),
  message: createMessage(),
  name: getRandomArrayElement(NAME),
});

// объекты массива — описание фотографии, опубликованной пользователем
const createPhotoDescription = () => ({
  id: createRandomIdFromRangeGenerator(1, PHOTOS_COUNT)(),
  url: generateUrl(),
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomInteger(LIKES_COUNTER.min, LIKES_COUNTER.max),
  comments: Array.from({ length: getRandomInteger(0, COMMENTS_COUNT)}, createCommentPhoto),
});

const photoDescription = () => Array.from({ length: PHOTOS_COUNT}, createPhotoDescription);

export {photoDescription};
