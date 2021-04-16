import Popup from './Popup.js';

export default class PopupDelete extends Popup {
  constructor(popupSelector, deleteCard) {
    super(popupSelector);
    this._popup = document.querySelector('.delete-popup');
    this._btn = this._popup.querySelector('.popup__btn');
    this._deleteCard = deleteCard;
  }

  setEventListeners() {
    this._btn.addEventListener('click',() => {this._deleteCard(this)});
    super.setEventListeners();
  }

  open() {
    this.setEventListeners();
    super.open();
  }

  close() {
    super.close();
  }
  
}