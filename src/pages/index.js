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
  elementsContainer,
  btnEdit,
  profileAddBtn, 
  popupInputName,
  popupInputJob,
  deletePopupSelector,
} from '../js/utils/constans.js';


const popupImg = new PopupWithImage(popupImgSelector);
const api = new Api({
  token: 'db03a97c-9ec5-4cd0-ab65-ee0272870f65',
  group: 'cohort-22',
});
let userId;




const createCard = (data) => {
  const card = new Card(
    data,
    elementTamplateSelector,
    () => {
      popupImg.open(data);
    },
    () => {
      const deletePopup = new PopupDelete(
        deletePopupSelector,
        () => {
          api.deleteCard(card.getCardId())
            .then(() => {
              card.removeCard();
              deletePopup.close();
            })
            .catch(() => console.log('Ошибка при удалении'))
        }
      );
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

const editProfilePopup = new PopupWithForm(
  editProfileSelector,
  (inputValueData) => {
    api.changeUserInfo(inputValueData);
    userInfo.setAvatar(info);
    userInfo.setUserInfo(inputValueData);
    // userInfo.setUserInfo(inputValueData);

    editProfilePopup.close();
  }
);

const newItemPopup = new PopupWithForm(newItemSelector, (inputValueData) => {
  api.loadNewCard(inputValueData)
    .then(res => {
      console.log(res);
      createCard(res);
    })

  newItemPopup.close();
});
//Вызовы методов классов

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