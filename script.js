'use strict';

const btnClose = document.querySelector('.popup__btn-close'),
      btnEdit = document.querySelector('.profile__edit-btn'),
      modal = document.querySelector('.popup');

function modalOpen() {
  modal.classList.add('popup_opened');
}

function modalClose() {
  modal.classList.remove('popup_opened');
}

btnEdit.addEventListener('click', modalOpen);
btnClose.addEventListener('click', modalClose);