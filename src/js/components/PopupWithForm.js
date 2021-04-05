import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor( popupSelector, formSubmit) {
    super(popupSelector);
    this._formSubmit = formSubmit;
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll('.popup__input');

    this._inputValues = {};

    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    })

    return this._inputValues;
  }

  setEventListeners() {
    this._form = this._popup.querySelector('.popup__form');

    this._form.addEventListener('submit',(e) => {
      e.preventDefault();
      
      this._formSubmit(this._getInputValues());
    });
    
    super.setEventListeners();
  }

  close() {
    
    //Сброс формы
    this._form.reset();


    super.close();
  }

}