import './index.css';

import Card from '../js/components/Card.js';
import FormValidator from '../js/components/FormValidator.js';
import Section from "../js/components/Section.js";
import PopupDelete from '../js/components/PopupDelete.js';
import PopupWithImage from '../js/components/PopupWithImage.js';
import PopupWithForm from '../js/components/PopupWithForm.js';
import UserInfo from '../js/components/UserInfo.js';
import Api from '../js/utils/Api.js';
import {
  //Параметры валидации
  validationConfig,
  //Параметры сервера
  elementTamplateSelector,
  editProfileSelector,
  newItemSelector,
  popupImgSelector,
  profileNameSelector,
  profileAboutSelector,
  profileAvatarSelector,
  newItemForm,
  editProfileForm,
  changeAvatarForm,
  elementsContainer,
  btnEdit,
  profileAddBtn, 
  changeAvatarBtn,
  popupInputName,
  popupInputJob,
  deletePopupSelector,
  changePopupSelector,
} from '../js/utils/constans.js';
import setSubmitBtnText from '../js/utils/utils.js';


const popupImg = new PopupWithImage(popupImgSelector);
const api = new Api({
  token: 'db03a97c-9ec5-4cd0-ab65-ee0272870f65',
  group: 'cohort-22',
  url: 'https://mesto.nomoreparties.co/v1/'
});
let userId;

const deletePopup = new PopupDelete(deletePopupSelector);
deletePopup.setEventListeners();

const createCard = (data) => {
  const card = new Card(
    data,
    elementTamplateSelector,
    () => {
      popupImg.open(data);
    },
    () => {
      deletePopup.setSubmitAction(() => {
        api.deleteCard(card.getCardId())
          .then(() => {
            card.removeCard();
            deletePopup.close();
          })
          .catch(() => console.log('Ошибка при удалении'))
      });
      deletePopup.open();
    },
    () => {
      if (card.findUserLike()) {
        api.removeLike(card.getCardId())
          .then((res) => {
            card.handleLike(res);
            card.refreshCardDataLikes(res);
          })
          .catch((err) => console.log(`Ошибка ${err}`))
      } else {
        api.setLike(card.getCardId())
          .then((res) => {
            card.handleLike(res);
            card.refreshCardDataLikes(res);
          })
          .catch((err) => console.log(`Ошибка ${err}`))
      }
    },
    userId,
  );

  const cardElement = card.getCard();

  cardList.addItems(cardElement);
}


// Инициализация карточек
const cardList = new Section({
  renderer: (item) => {
    // cardId = item._id;
    createCard(item);
    
  }
}, elementsContainer);


//Экземпляры классов
const userInfo = new UserInfo({
  profileNameSelector: profileNameSelector,
  profileAboutSelector: profileAboutSelector,
  profileAvatarSelector: profileAvatarSelector,
});

Promise.all([api.getCardInfo(), api.getInfoUser()])
  .then(([cardObj, info]) => {
    userId = info._id;

    userInfo.setAvatar(info);
    userInfo.setUserInfo(info);

    cardList.renderItems(cardObj);
  })
  .catch((err) => console.log(err));


// Валидаторы
const editProfileFormValidator = new FormValidator(validationConfig, editProfileForm);
const newItemFormValidator = new FormValidator(validationConfig, newItemForm);
const changePopupValidator = new FormValidator(validationConfig, changeAvatarForm);

const editProfilePopup = new PopupWithForm(
  editProfileSelector,
  (inputValueData) => {
    api.changeUserInfo(inputValueData)
      .then(info => {
        userInfo.setAvatar(info);
        userInfo.setUserInfo(info);
        editProfilePopup.close();
      })
      .catch(err => console.log(err))
      .finally(() => setSubmitBtnText(editProfileSelector, 'Сохранение...'))
    
  }
);

const newItemPopup = new PopupWithForm(newItemSelector, (inputValueData) => {
  api.loadNewCard(inputValueData)
    .then(res => {
      createCard(res);
      newItemPopup.close();
    })
    .catch(err => console.log(err))
    .finally(() => setSubmitBtnText(newItemSelector, 'Создание карточки...'))
  
  
});

const changePopup = new PopupWithForm(changePopupSelector, (inputValueData) => {
  api.updateAvatar(inputValueData.link)
    .then(res => {
      userInfo.setAvatar(res);
      changePopup.close();
      })
    .catch(err => console.log(err))
    .finally(() => setSubmitBtnText(editProfileSelector, 'Сохранение...'))

  
})
//Вызовы методов классов

editProfilePopup.setEventListeners();
newItemPopup.setEventListeners();
popupImg.setEventListeners();
changePopup.setEventListeners();
editProfileFormValidator.enableValidation();
newItemFormValidator.enableValidation();
changePopupValidator.enableValidation();

// Открытие формы редактирования данных профиля
function openFormAddProfile() {
  const profileData = userInfo.getUserInfo();
  popupInputName.value = profileData.name;
  popupInputJob.value = profileData.job;

  editProfileFormValidator.resetValidation();
  setSubmitBtnText(editProfileSelector, 'Сохранить');
  editProfilePopup.open();
}

// Обработчики событий

btnEdit.addEventListener('click', openFormAddProfile);
profileAddBtn.addEventListener('click', () => {
  newItemFormValidator.resetValidation();
  setSubmitBtnText(newItemSelector, 'Создать');
  newItemPopup.open();
});
changeAvatarBtn.addEventListener('click', () => {
  changePopupValidator.resetValidation();
  setSubmitBtnText(editProfileSelector, 'Сохранить');
  changePopup.open();
});