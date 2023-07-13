const scaleControlSmallerElement = document.querySelector('.scale__control--smaller');
const scaleControlBiggerElement = document.querySelector('.scale__control--bigger');
const scaleControlInputElement = document.querySelector('.scale__control--value');
const imageElement = document.querySelector('.img-upload__preview img');

const SCALE_STEP = 25;
const SCALE_DEFAULT = 100;
const SCALE_MAX = 100;
const SCALE_MIN = 25;

const scaleImage = (value) => {
  imageElement.style.transform = `scale(${value / 100})`;
  scaleControlInputElement.value = `${value}%`;
};

const onSmallerControlClick = () => {
  const currentValue = parseInt(scaleControlInputElement.value, 10);
  const newValue = currentValue - SCALE_STEP;

  if (newValue < SCALE_MIN) {
    scaleImage(SCALE_MIN);
  } else {
    scaleImage(newValue);
  }
};

const onBiggerControlClick = () => {
  const currentValue = parseInt(scaleControlInputElement.value, 10);
  const newValue = currentValue + SCALE_STEP;

  if (newValue < SCALE_MAX) {
    scaleImage(newValue);
  } else {
    scaleImage(SCALE_MAX);
  }
};

const resetScale = () => scaleImage(SCALE_DEFAULT);

scaleControlSmallerElement.addEventListener('click', onSmallerControlClick);
scaleControlBiggerElement.addEventListener('click', onBiggerControlClick);

export { resetScale };
