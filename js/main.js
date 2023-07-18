import './form.js';
import './scale.js';
import './slider.js';

import { renderGallery } from './gallery.js';
import { showAlert } from './util.js';
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
} catch (err) {
  showAlert(err.message);
}
