import '../../pages/index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from "../components/Section.js";
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {
  //Массив с карточками
  initialCards,
  //Параметры валидации
  validationConfig,
  //Селекторы
  elementTamplateSelector,
  editProfileSelector,
  newItemSelector,
  popupImgSelector,
  profileNameSelector,
  profileAboutSelector,
  newItemForm,
  editProfileForm,
  elementsContainer,
  btnEdit,
  profileAddBtn, 
  popupInputName,
  profileName,
  popupInputJob,
  profileJob,
} from '../utils/constans.js';

// Инициализация карточек
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(
      item,
      elementTamplateSelector,
      () => {
        const popupImg = new PopupWithImage(popupImgSelector, item);
        popupImg.setEventListeners();
        popupImg.open();
      }
    );

    const cardElement = card.getCard();

    cardList.addItems(cardElement);

  }
}, elementsContainer);

//Экземпляры классов
const userInfo = new UserInfo({
  profileNameSelector: profileNameSelector,
  profileAboutSelector: profileAboutSelector,
});

// Валидаторы
const editProfileFormValidator = new FormValidator(validationConfig, editProfileForm);
const newItemFormValidator = new FormValidator(validationConfig, newItemForm);

const editProfilePopup = new PopupWithForm(
  editProfileSelector,
  (inputValueData) => {
    profileName.textContent = inputValueData.name;
    profileJob.textContent = inputValueData.job;

    editProfilePopup.close();
  }
);

const newItemPopup = new PopupWithForm(newItemSelector, (inputValueData) => {
  const newCard = new Card(
    inputValueData, 
    elementTamplateSelector,
    () => {
      const popupImg = new PopupWithImage(popupImgSelector, inputValueData);
      popupImg.setEventListeners();
      popupImg.open();
    });

  const newCardElement = newCard.getCard();

  cardList.addItems(newCardElement);

  newItemPopup.close();
});
//Вызовы методов классов
cardList.renderItems();
editProfilePopup.setEventListeners();
newItemPopup.setEventListeners();
editProfileFormValidator.enableValidation();
newItemFormValidator.enableValidation();

// Открытие формы редактирования данных профиля
function openFormAddProfile() {
  const profileData = userInfo.getUserInfo();
  popupInputName.value = profileData.name;
  popupInputJob.value = profileData.about;

  editProfilePopup.open();
}

// Обработчики событий

btnEdit.addEventListener('click', openFormAddProfile);
profileAddBtn.addEventListener('click', () => {
  newItemPopup.open();
});