// Объявление переменных
const modal = document.querySelector('.popup');
const popupForm = document.querySelector('.popup__form');
const btnClose = document.querySelector('.popup__btn-close');
const btnEdit = document.querySelector('.profile__edit-btn');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const popupInputName = modal.querySelector('#name');
const popupInputJob = modal.querySelector('#job');
const newItem = document.querySelector('.new-item');
const profileAddBtn = document.querySelector('.profile__add-btn');
const newItemBtnClose = newItem.querySelector('.new-item__btn-close');
const cardsContainer = document.querySelector('.elements');
const cardTemlate = document.querySelector('#element').content;
const newItemForm = newItem.querySelector('.new-item__form');
const elementsContainer = document.querySelector('.elements');
const imagePopupCloseBtn = document.querySelector('.image-popup__close-btn');
const imagePopup = document.querySelector('.image-popup');
const imagePopupImg = imagePopup.querySelector('.image-popup__img');
const imagePopupTitle = imagePopup.querySelector('.image-popup__title');
// Функции

//Открытие попапов
function openPopups(popup, classMod) {
  popup.classList.add(classMod);
}
// Закрытие попапjd
function closePopups(popup, classMod) {
  popup.classList.remove(classMod);
}

// Открытие формы редактирования данных профиля
function openFormAddProfile() {
  popupInputName.value = profileName.textContent;
  popupInputJob.value = profileJob.textContent;
  openPopups(modal, 'popup_opened');
}

// Работа формы редактирования данных профиля
function formSubmitHandler(e) {
  e.preventDefault();

  profileName.textContent = popupInputName.value;
  profileJob.textContent = popupInputJob.value;
  closePopups(modal, 'popup_opened');
}

// Создание карточек 
function getCard(data) {
  card = cardTemlate.querySelector('.element').cloneNode(true);

  const likeBtn = card.querySelector('.element__like-btn');
  const removeBtn = card.querySelector('.element__remove-btn');
  const cardImage = card.querySelector('.element__image');
  const cardTitle = card.querySelector('.element__title');

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  likeBtn.addEventListener('click', (e) => {addLike(e)});
  removeBtn.addEventListener('click', (e) => {removeCard(e)});
  cardImage.addEventListener('click', () => {
    openPopups(cardImage, 'image-popup_active');
  });
  
  return card;
}

// Добавление карточки в контейнер
function renderCard(data, wrap) {
  wrap.prepend(getCard(data));
}

// Инициализация карточек
initialCards.forEach((data) => {
  renderCard(data, elementsContainer);
})

// Лайк
function addLike(e) {
  e.target.classList.toggle('element__like-btn_active');
}

// Удаление карточки
function removeCard(e) {
  e.target.closest('.element').remove();
}

// Открытие картинки 
function openImagePopup(data) {
  imagePopupImg.src = data.link;
  imagePopupImg.alt = data.name;
  imagePopupTitle.textContent = data.name;
  openPopups(imagePopup, 'image-popup_active');
}

// Обработчики событий
btnClose.addEventListener('click', () => {
  closePopups(modal, 'popup_opened');
});
newItemBtnClose.addEventListener('click', () => {
  closePopups(newItem, 'new-item_opened');
})
imagePopupCloseBtn.addEventListener('click', () => {
  closePopups(imagePopup, 'image-popup_active')
});

btnEdit.addEventListener('click', openFormAddProfile);
profileAddBtn.addEventListener('click', () => {
  openPopups(newItem, 'new-item_opened');
});

popupForm.addEventListener('submit', formSubmitHandler);
newItemForm.addEventListener('submit', (e) => {
  e.preventDefault();

const dataNewItem = 
  {
    name: newItemForm.querySelector('#newName').value,
    link: newItemForm.querySelector('#image').value,
  };

  renderCard(dataNewItem, elementsContainer);

  closePopups(newItem,'new-item_opened');
});

