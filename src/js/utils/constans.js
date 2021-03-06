//Массив с карточками


// Параметры валидации
export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__input-error_active'
};



// Селекторы
export const editProfileSelector = '.profile-popup';
export const newItemSelector = '.new-item-popup';
export const profileNameSelector = '.profile__name';
export const profileAboutSelector = '.profile__job';
export const profileAvatarSelector = '.profile__img';
export const popupImgSelector = '.image-popup';
export const elementTamplateSelector = '#element';
export const deletePopupSelector = '.delete-popup';
export const changePopupSelector = '.change-popup';

// Редактировние профиля
export const profilePopup = document.querySelector('.profile-popup');
export const editProfileForm = profilePopup.querySelector('.popup__form');
export const btnEdit = document.querySelector('.profile__edit-btn');
export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__job');
export const popupInputName = profilePopup.querySelector('#name-input');
export const popupInputJob = profilePopup.querySelector('#job-input');

// Добавление новой карточки
export const newItem = document.querySelector('.new-item-popup');
export const profileAddBtn = document.querySelector('.profile__add-btn');
export const newItemForm = newItem.querySelector('.popup__form_type_new-item');
export const newItemFormName = newItemForm.querySelector('#newName-input');
export const newItemFormLink = newItemForm.querySelector('#image-input');
export const elementsContainer = document.querySelector('.elements');

// Все попапы
export const popups = document.querySelectorAll('.popup');

export const imagePopup = document.querySelector('.image-popup');
export const imagePopupImg = imagePopup.querySelector('.image-popup__img');
export const imagePopupTitle = imagePopup.querySelector('.image-popup__title');

export const changeAvatarForm = document.querySelector('.popup__form_type_change');
export const changeAvatarBtn = document.querySelector('.profile__img-wrapper');