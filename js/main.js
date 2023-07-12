import './form.js';

import {photoDescription} from './data.js';
import { renderGallery } from './gallery.js';

const photos = photoDescription();

renderGallery (photos);
