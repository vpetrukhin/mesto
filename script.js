'use strict';

const modal = document.querySelector('.popup'),
      popupForm = document.querySelector('.popup__form'),
      btnClose = document.querySelector('.popup__btn-close'),
      btnEdit = document.querySelector('.profile__edit-btn'),
      profileName = document.querySelector('.profile__name'),
      profileJob = document.querySelector('.profile__job'),
      popupInputName = modal.querySelector('#name'),
      popupInputJob = modal.querySelector('#job');

let nameValue = profileName.textContent;
let jobValue = profileJob.textContent;

// console.log(btnEdit);

function modalOpen() {
  popupInputName.value = nameValue;
  popupInputJob.value = jobValue;
  modal.classList.add('popup_opened');
}

function modalClose() {
  modal.classList.remove('popup_opened');
}

function formSubmitHandler (e) {
  e.preventDefault();
  
  profileName.textContent = popupInputName.value;
  profileJob.textContent = popupInputJob.value;
  modalClose();
}

btnEdit.addEventListener('click', modalOpen);
btnClose.addEventListener('click', modalClose);
popupForm.addEventListener('submit', formSubmitHandler);