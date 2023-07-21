import './form.js';
import './scale.js';
import './slider.js';

import { renderGallery, getSortingPictures, preparingDataForSorting } from './pictures.js';
import { showAlert, debounce } from './util.js';
import { getData, sendData } from './api.js';
import { setUserFormSubmit, hideModal } from './form.js';
import { showSuccessPopup, showErrorPopup } from './notifications.js';

setUserFormSubmit(async (data) => {
  try {
    await sendData(data);
    hideModal();
    showSuccessPopup();
  } catch {
    showErrorPopup();
  }
});

try {
  const data = await getData();
  renderGallery(data);
  preparingDataForSorting(data, debounce(renderGallery));
} catch (err) {
  showAlert(err.message);
}
