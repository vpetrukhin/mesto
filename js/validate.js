

// Показ элемента ошибки
const showInputError = (formElement, inputElement, errorMessage, object) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  errorElement.textContent = errorMessage;
  errorElement.classList.add(`${object.errorClass}`);

  inputElement.classList.add(`${object.inputErrorClass}`);
};
// Скрытие элемента ошибки
const hideInputError = (formElement, inputElement, object) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(`${object.inputErrorClass}`);

  errorElement.textContent = '';
  errorElement.classList.remove(`${object.errorClass}`);
};
// Проворке валидности полей для кнопки
const hasInvalidInput = (inputList) => {

  return  inputList.some((inputElement) => {


    return !inputElement.validity.valid;
  })
}
// Активация кнопки
const toggleButtonState = (inputList, buttonElement, object) => {

  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(`${object.inactiveButtonClass}`);
  } else {
    buttonElement.classList.remove(`${object.inactiveButtonClass}`);
  }
}
// Основная проверка полей
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, enableValidationObj);
  } else {
    hideInputError(formElement, inputElement, enableValidationObj);
  }
}
// Задание слушателей
const setEventListener = (formElement, object) => {
  const inputList = Array.from(formElement.querySelectorAll(`${object.inputSelector}`));
  const buttonElement = formElement.querySelector(`${object.submitButtonSelector}`);
  toggleButtonState(inputList, butonElement, object);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement, object);
    });
  });
}
// Главная функция валидации
const enableValidation = (object) => {
  const formList = Array.from(document.querySelectorAll(`${object.formSelector}`));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (e) => {
      e.preventDefault();
    })

    setEventListener(formElement, enableValidationObj);
  })
}

enableValidation(enableValidationObj);