import './index.css';

import Card from '../js/components/Card.js';
import FormValidator from '../js/components/FormValidator.js';
import Section from "../js/components/Section.js";
import PopupWithImage from '../js/components/PopupWithImage.js';
import PopupWithForm from '../js/components/PopupWithForm.js';
import UserInfo from '../js/components/UserInfo.js';
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
} from '../js/utils/constans.js';

const popupImg = new PopupWithImage(popupImgSelector);

const createCard = (data) => {
  const card = new Card(
    data,
    elementTamplateSelector,
    () => {
      popupImg.open(data);
    }
  );

  const cardElement = card.getCard();

  cardList.addItems(cardElement);
}

// Инициализация карточек
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    createCard(item);
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
    userInfo.setUserInfo(inputValueData);
    // profileName.textContent = inputValueData.name;
    // profileJob.textContent = inputValueData.job;

    editProfilePopup.close();
  }
);

const newItemPopup = new PopupWithForm(newItemSelector, (inputValueData) => {
  createCard(inputValueData);

  newItemPopup.close();
});
//Вызовы методов классов
cardList.renderItems();
editProfilePopup.setEventListeners();
newItemPopup.setEventListeners();
popupImg.setEventListeners();
editProfileFormValidator.enableValidation();
newItemFormValidator.enableValidation();

// Открытие формы редактирования данных профиля
function openFormAddProfile() {
  const profileData = userInfo.getUserInfo();
  popupInputName.value = profileData.name;
  popupInputJob.value = profileData.job;

  editProfileFormValidator.resetValidation();
  editProfilePopup.open();
}

// Обработчики событий

btnEdit.addEventListener('click', openFormAddProfile);
profileAddBtn.addEventListener('click', () => {
  newItemFormValidator.resetValidation();
  newItemPopup.open();
});