import Popup from './Popup.js';

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imagePopup = document.querySelector(popupSelector);
    this._imagePopupImg = this._imagePopup.querySelector('.image-popup__img');
    this._imagePopupTitle = this._imagePopup.querySelector('.image-popup__title');
  }

  open(items) {
    this._imagePopupImg.src = items.link;
    this._imagePopupImg.alt = items.link;
    this._imagePopupTitle.textContent = items.name;

    super.open();
  }

}

export default PopupWithImage;