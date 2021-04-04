import Popup from './Popup.js';
import {
  imagePopupImg,
  imagePopupTitle
} from '../utils/constans.js';

class PopupWithImage extends Popup {
  constructor(popupSelector, items) {
    super(popupSelector);
    this._link = items.link;
    this._name = items.name;
  }

  open() {
    imagePopupImg.src = this._link;
    imagePopupImg.alt = this._name;
    imagePopupTitle.textContent = this._name;

    super.open();
  }

}

export default PopupWithImage;