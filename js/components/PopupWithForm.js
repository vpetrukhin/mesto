import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor( popupSelector, formSubmit) {
    super(popupSelector);
    this._formSubmit = formSubmit;
  }

  _getInputValues() {
    const form = this._popup.querySelector('.popup__form');
    const inputs = form.querySelectorAll('.popup__input');
    this._inputValues = {};
    inputs.forEach((input) => {
      inputValues[`${input.name}`] = input.link;
    })
    return this._inputValues;
  }

  setEventListeners(form) {
    form.addEventListener('submit', this._formSubmit);
    super.setEventListeners(this._popup);
  }

  close() {
    this._popup.querySelector('.popup__form').reset();

    super.close(this._popup);
  }

}