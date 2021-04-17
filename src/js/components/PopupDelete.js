import Popup from './Popup.js';

export default class PopupDelete extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popup = document.querySelector('.delete-popup');
    this._btn = this._popup.querySelector('.popup__btn');
  }

  setSubmitAction(submitAction) {
    this._handleSubmitCallback = submitAction;
  }

  setEventListeners() {
    this._btn.addEventListener('click',() => {this._handleSubmitCallback(this)});
    super.setEventListeners();
  }

  open() {
    super.open();
  }

  close() {
    super.close();
  }
  
}