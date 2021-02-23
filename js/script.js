// Объявление переменных

// Редактировние профиля
const modal = document.querySelector('.popup');
const popupForm = document.querySelector('.popup__form');
const btnClose = document.querySelector('.popup__btn-close');
const btnEdit = document.querySelector('.profile__edit-btn');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const popupInputName = modal.querySelector('#name-input');
const popupInputJob = modal.querySelector('#job-input');

// Добавление новой карточки
const newItem = document.querySelector('.popup_type_new-item');
const profileAddBtn = document.querySelector('.profile__add-btn');
const newItemBtnClose = newItem.querySelector('.popup__btn-close');
const cardTemlate = document.querySelector('#element').content;
const newItemForm = newItem.querySelector('.popup__form');
const newItemFormName = newItemForm.querySelector('#newName-input');
const newItemFormLink = newItemForm.querySelector('#image-input');

// Попап с фотографией
const elementsContainer = document.querySelector('.elements');
const imagePopupCloseBtn = document.querySelector('.image-popup__close-btn');
const imagePopup = document.querySelector('.image-popup');
const imagePopupImg = imagePopup.querySelector('.image-popup__img');
const imagePopupTitle = imagePopup.querySelector('.image-popup__title');

// Функции

//Открытие попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
}
// Закрытие попапjd
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// Открытие формы редактирования данных профиля
function openFormAddProfile() {
  popupInputName.value = profileName.textContent;
  popupInputJob.value = profileJob.textContent;
  openPopup(modal);
}

// Работа формы редактирования данных профиля
function formSubmitHandler(e) {
  e.preventDefault();

  profileName.textContent = popupInputName.value;
  profileJob.textContent = popupInputJob.value;
  closePopup(modal);
}

// Создание карточек 
function getCard(data) {
  const card = cardTemlate.querySelector('.element').cloneNode(true);

  const likeBtn = card.querySelector('.element__like-btn');
  const removeBtn = card.querySelector('.element__remove-btn');
  const cardImage = card.querySelector('.element__image');
  const cardTitle = card.querySelector('.element__title');

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  likeBtn.addEventListener('click', addLike);
  removeBtn.addEventListener('click', removeCard);
  cardImage.addEventListener('click', () => {

    imagePopupImg.src = data.link;
    imagePopupImg.alt = data.name;
    imagePopupTitle.textContent = data.name;

    openPopup(imagePopup);
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
  openPopup(imagePopup);
}

// Обработчики событий

//Закрытие с помощье кнопки "Escape"
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closePopup(modal);
    closePopup(newItem);
    closePopup(imagePopup);
  }
})
modal.addEventListener('click',(e) => {
  if (e.target === modal || e.target === btnClose) {
    closePopup(modal);
  }
})
newItem.addEventListener('click', (e) => {
  if (e.target === newItem || e.target === newItemBtnClose) {
    closePopup(newItem);
  }
})
imagePopup.addEventListener('click', (e) => {
  if (e.target === imagePopup || e.target === imagePopupCloseBtn) {
    closePopup(imagePopup);
  }
});

btnEdit.addEventListener('click', openFormAddProfile);
profileAddBtn.addEventListener('click', () => {
  openPopup(newItem);
});

popupForm.addEventListener('submit', formSubmitHandler);
newItemForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const dataNewItem = {
    name: newItemFormName.value,
    link: newItemFormLink.value,
  };

  renderCard(dataNewItem, elementsContainer);

  newItemForm.reset();
  closePopup(newItem);
});