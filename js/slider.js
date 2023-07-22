const imagePreviewElement = document.querySelector('.img-upload__preview img');
const effectValueElement = document.querySelector('.effect-level__value');
const effectValueContainerElement = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const effectsListElement = document.querySelector('.effects__list');

const SliderOptions = {
  none: {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
  },
  chrome: {
    range: {
      min: 0,
      max: 1
    },
    start: 1,
    step: 0.1
  },
  sepia: {
    range: {
      min: 0,
      max: 1
    },
    start: 1,
    step: 0.1
  },
  marvin: {
    range: {
      min: 0,
      max: 100
    },
    start: 100,
    step: 1
  },
  phobos: {
    range: {
      min: 0,
      max: 3
    },
    start: 3,
    step: 0.1
  },
  heat: {
    range: {
      min: 1,
      max: 3
    },
    start: 3,
    step: 0.1
  }
};

const createSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
    format: {
      to: (value) => {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: (value) => parseFloat(value),
    },
  });
};

const updateSlider = (effect) => sliderElement.noUiSlider.updateOptions(SliderOptions[effect]);

const startConfigsSlider = () => {
  effectValueContainerElement.classList.add('hidden');
};

const destroySlider = () => {
  sliderElement.noUiSlider.destroy();
  effectValueContainerElement.classList.add('hidden');
  imagePreviewElement.style.filter = '';
};

const showSlider = () => {
  effectValueContainerElement.classList.remove('hidden');
};

const changeEffect = (effect, level) => {
  sliderElement.noUiSlider.on('update', () => {
    effectValueElement.value = sliderElement.noUiSlider.get();
    imagePreviewElement.style.filter = `${effect}(${effectValueElement.value}${level})`;
  });
};

effectsListElement.addEventListener('change', (evt) => {

  showSlider();

  switch (evt.target.id) {
    case 'effect-none':
      startConfigsSlider();
      imagePreviewElement.style.filter = '';
      break;
    case 'effect-chrome':
      updateSlider('chrome');
      changeEffect('grayscale', '');
      break;
    case 'effect-sepia':
      updateSlider('sepia');
      changeEffect('sepia', '');
      break;
    case 'effect-marvin':
      updateSlider('marvin');
      changeEffect('invert', '%');
      break;
    case 'effect-phobos':
      updateSlider('phobos');
      changeEffect('blur', 'px');
      break;
    case 'effect-heat':
      updateSlider('heat');
      changeEffect('brightness', '');
      break;
  }
});

export {
  destroySlider,
  createSlider,
  startConfigsSlider,
  imagePreviewElement
};
