'use strict';
// Объявление переменных
const modal = document.querySelector('.popup'),
      popupForm = document.querySelector('.popup__form'),
      btnClose = document.querySelector('.popup__btn-close'),
      btnEdit = document.querySelector('.profile__edit-btn'),
      profileName = document.querySelector('.profile__name'),
      profileJob = document.querySelector('.profile__job'),
      popupInputName = modal.querySelector('#name'),
      popupInputJob = modal.querySelector('#job');

// Функции

// Открытие попапа
function openModal() {
  popupInputName.value = profileName.textContent;
  popupInputJob.value = profileJob.textContent;
  modal.classList.add('popup_opened');
}

// Закрытие попапа
function closeModal() {
  modal.classList.remove('popup_opened');
}

// Работа формы
function formSubmitHandler (e) {
  e.preventDefault();
  
  profileName.textContent = popupInputName.value;
  profileJob.textContent = popupInputJob.value;
  closeModal();
}

// Обработчики событий

btnEdit.addEventListener('click', openModal);
btnClose.addEventListener('click', closeModal);
popupForm.addEventListener('submit', formSubmitHandler);