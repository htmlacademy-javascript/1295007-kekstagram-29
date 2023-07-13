import './form.js';
import './scale.js';
import './slider.js';

import {photoDescription} from './data.js';
import { renderGallery } from './gallery.js';

const photos = photoDescription();

renderGallery (photos);
