import {
  imagePopup,
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

    imagePopupImg.src = this._image;
    imagePopupImg.alt = this._title;
    imagePopupTitle.textContent = this._title;
    
    super.open();
  }

}

export default PopupWithImage;