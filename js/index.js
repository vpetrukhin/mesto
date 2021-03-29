import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';

//Массив с карточками

const initialCards = [{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Параметры валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__input-error_active'
};

// Объявление переменных

// Редактировние профиля
const profilePopup = document.querySelector('.profile-popup');
const editProfileForm = profilePopup.querySelector('.popup__form');
const btnEdit = document.querySelector('.profile__edit-btn');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const popupInputName = profilePopup.querySelector('#name-input');
const popupInputJob = profilePopup.querySelector('#job-input');

// Добавление новой карточки
const newItem = document.querySelector('.new-item-popup');
const profileAddBtn = document.querySelector('.profile__add-btn');
const newItemForm = newItem.querySelector('.popup__form_type_new-item');
const newItemFormName = newItemForm.querySelector('#newName-input');
const newItemFormLink = newItemForm.querySelector('#image-input');

// Попап с фотографией
const elementsContainer = document.querySelector('.elements');
const elementTamplateSelector = '#element';


// Все попапы
const popups = document.querySelectorAll('.popup');

// Валидаторы
const editProfileFormValidator = new FormValidator(validationConfig, editProfileForm);
const newItemFormValidator = new FormValidator(validationConfig, newItemForm);

editProfileFormValidator.enableValidation();
newItemFormValidator.enableValidation();

// Функции

//Открытие попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}
// Закрытие попапов
function closePopup(popup) { 
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

// Открытие формы редактирования данных профиля
function openFormAddProfile() {
  editProfileFormValidator.resetForm();
  popupInputName.value = profileName.textContent;
  popupInputJob.value = profileJob.textContent;
  openPopup(profilePopup);
}

// Работа формы редактирования данных профиля
function formSubmitHandler(e) {
  e.preventDefault();

  profileName.textContent = popupInputName.value;
  profileJob.textContent = popupInputJob.value;
  editProfileForm.reset();
  closePopup(profilePopup);
}

// Инициализация карточек
initialCards.forEach((data) => {
  renderCard(elementsContainer, createCard(data));
})

function createCard(data) {
  const card = new Card(data, elementTamplateSelector);
  return card;
}

function renderCard(container, card) {
  container.prepend(card.getCard());
}

function closeByEscape(e) {
  if (e.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

// Закрытие всех попапов
popups.forEach((popup) => {
  popup.addEventListener('click', (e) => {
    if (e.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if (e.target.classList.contains('popup__btn-close')) {
      closePopup(popup);
    }
  })
})

// Обработчики событий

btnEdit.addEventListener('click', openFormAddProfile);
profileAddBtn.addEventListener('click', () => {
  newItemFormValidator.resetForm();
  openPopup(newItem);

});

editProfileForm.addEventListener('submit', formSubmitHandler);
newItemForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const dataNewItem = {
    name: newItemFormName.value,
    link: newItemFormLink.value,
  };

  renderCard(elementsContainer, createCard(dataNewItem));
  
  closePopup(newItem);
});

