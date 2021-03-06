class FormValidator {
  constructor(object, formElement) {
    this._enableValidationObj = object;
    this._formElement = formElement;
  }
  
  // Главная функция валидации
  enableValidation() {
    this._formElement.addEventListener('submit', (e) => {
      e.preventDefault();
    })
    
    this._setEventListener(this._formElement, this._enableValidationObj);
  }

  // Задание слушателей
  _setEventListener() {
    this._inputList = Array.from(this._formElement.querySelectorAll(`${this._enableValidationObj.inputSelector}`));
    this._buttonElement = this._formElement.querySelector(`${this._enableValidationObj.submitButtonSelector}`);

    this._toggleButtonState(this._inputList, this._buttonElement, this._enableValidationObj);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._inputList, this._buttonElement, this._enableValidationObj);
      });
    });
  }

  // Основная проверка полей
  _checkInputValidity(inputElement) {
    
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage, this._enableValidationObj);
    } else {
      this._hideInputError(inputElement, this._enableValidationObj);
    }
    
  }

  // Активация кнопки
  _toggleButtonState(inputList, buttonElement) {

    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(`${this._enableValidationObj.inactiveButtonClass}`);
      buttonElement.setAttribute('disabled', 'true');
    } else {
      buttonElement.classList.remove(`${this._enableValidationObj.inactiveButtonClass}`);
      buttonElement.removeAttribute('disabled');
    }
  }

  // Проворке валидности полей для кнопки
  _hasInvalidInput(inputList) {

    return inputList.some((inputElement) => {
      
      return !inputElement.validity.valid;
    })
  }

  // Скрытие элемента ошибки
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(`${this._enableValidationObj.inputErrorClass}`);

    errorElement.textContent = '';
    errorElement.classList.remove(`${this._enableValidationObj.errorClass}`);
  };

  // Показ элемента ошибки
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(`${this._enableValidationObj.errorClass}`);

    inputElement.classList.add(`${this._enableValidationObj.inputErrorClass}`);
  };

  resetValidation() {
    //Сброс ошибок
    this._inputList.forEach((input) =>{
      this._hideInputError(input);
    })
    
    //Деактивация кнопки
    this._toggleButtonState(this._inputList, this._buttonElement);
  };
}
  
  export default FormValidator;
