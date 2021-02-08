'use strict';
// Объявление переменных
const modal = document.querySelector('.popup'),
      popupForm = document.querySelector('.popup__form'),
      btnClose = document.querySelector('.popup__btn-close'),
      btnEdit = document.querySelector('.profile__edit-btn'),
      profileName = document.querySelector('.profile__name'),
      profileJob = document.querySelector('.profile__job'),
      popupInputName = modal.querySelector('#name'),
      popupInputJob = modal.querySelector('#job'),
      newItem = document.querySelector('.new-item'),
      profileAddBtn = document.querySelector('.profile__add-btn'),
      newItemBtnClose = newItem.querySelector('.new-item__btn-close'),
      cardsContainer = document.querySelector('.elements'),
      cardTemlate = document.querySelector('#element').content,
      newItemForm = newItem.querySelector('.new-item__form'),
      elementsContainer = document.querySelector('.elements'),
      imagePopupCloseBtn = document.querySelector('.image-popup__close-btn'),
      imagePopup = document.querySelector('.image-popup');

//Массив с карточками

const initialCards = [
  {
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

// Функции

//Функции формы добавления фотографии
//Открытие-закрытие
function openCloseNewItemForm() {
  newItem.classList.toggle('new-item_opened');
}

//Функции попапа
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

// Добавление карточек
function createCards() {
  Array.from(elementsContainer.children).forEach((item) => {
    item.remove();
  })

  initialCards.forEach((item) => {
    const card = cardTemlate.querySelector('.element').cloneNode(true);
    card.querySelector('.element__image').setAttribute('src', item.link);
    //card.querySelector('.element__image').alt = item.name;
    card.querySelector('.element__title').textContent = item.name;

    cardsContainer.prepend(card);
  });
}

// Лайк
function addLike() {
  const elementLikeBtn = document.querySelectorAll('.element__like-btn')
  elementLikeBtn.forEach((item) => {
    item.addEventListener('click', () => {
      item.classList.toggle('element__like-btn_active');
    });
  })
}

// Удаление карточки
function removeCard() {
  const elementRemoveBtn = document.querySelectorAll('.element__remove-btn');

  elementRemoveBtn.forEach((item) => {
    item.addEventListener('click', () => {
      item.closest('.element').remove();
    })
  })
}

// Открытие картинки 
function openImagePopup() {
  const elementImage = document.querySelectorAll('.element__image');

  elementImage.forEach((item) => {
    item.addEventListener('click', () => {
      imagePopup.querySelector('.image-popup__img').setAttribute('src', item.getAttribute('src'));
      imagePopup.querySelector('.image-popup__title').textContent = item.closest('.element').querySelector('.element__title').textContent;
      imagePopup.classList.add('image-popup_active');
    })
  })
}

// Обработчики событий
document.addEventListener('DOMContentLoaded', () => {
  createCards();
  addLike();
  removeCard();
  openImagePopup();
})
btnEdit.addEventListener('click', openModal);
btnClose.addEventListener('click', closeModal);
popupForm.addEventListener('submit', formSubmitHandler);
profileAddBtn.addEventListener('click', openCloseNewItemForm);
newItemBtnClose.addEventListener('click', openCloseNewItemForm)
newItemForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const newItemInputName = newItemForm.querySelector('#name');
  const newItemInputImage = newItemForm.querySelector('#image');

  initialCards.push( {
    name: newItemInputName.value,
    link: newItemInputImage.value
  } )
  createCards();
  addLike();
  removeCard();
  openImagePopup();

  openCloseNewItemForm();
});
imagePopupCloseBtn.addEventListener('click', () => {
  console.log('fu');
  imagePopup.classList.remove('image-popup_active');
});

