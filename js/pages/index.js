import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from "../components/Section.js";
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import {
  validationConfig,
  newItemForm,
  editProfileForm,
  initialCards,
  elementsContainer,
  elementTamplateSelector,
  popups,
  btnEdit,
  profileAddBtn, 
  popupImgSelector,
  popupInputName,
  profileName,
  popupInputJob,
  profileJob,
  profilePopup,
  newItem,
  editProfileSelector,
} from '../utils/constans.js';


const popup = new Popup('.popup')

const editProfilePopup = new PopupWithForm(
    editProfileSelector, 
    (e) => {
      e.preventDefault();

      profileName.textContent = popupInputName.value;
      profileJob.textContent = popupInputJob.value;
      
      // closePopup(profilePopup);
      editProfilePopup.close();
    }
);

const newItemPopup = new PopupWithForm();

editProfilePopup.setEventListeners(editProfileForm);

// Валидаторы
const editProfileFormValidator = new FormValidator(validationConfig, editProfileForm);
const newItemFormValidator = new FormValidator(validationConfig, newItemForm);

editProfileFormValidator.enableValidation();
newItemFormValidator.enableValidation();

// Функции

// Открытие формы редактирования данных профиля
function openFormAddProfile() {
  editProfileFormValidator.resetForm();
  popupInputName.value = profileName.textContent;
  popupInputJob.value = profileJob.textContent;
  // openPopup(profilePopup);
  popup.open(profilePopup);
}

// Работа формы редактирования данных профиля
function formSubmitHandler(e) {
  
}

// Инициализация карточек
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(
      item,
      elementTamplateSelector,
      () => {
        const popupImg = new PopupWithImage(popupImgSelector, item);
        popupImg.open();
      }
    );

    const cardElement = card.getCard();

    cardList.addItems(cardElement);

  }
}, elementsContainer);

cardList.renderItems();


//Закрытие Escape

function closeByEscape(e) {
  if (e.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

// Закрытие всех попапов
popups.forEach((item) => {
  popup.setEventListeners(item);
})

// Обработчики событий

btnEdit.addEventListener('click', openFormAddProfile);
profileAddBtn.addEventListener('click', () => {
  newItemFormValidator.resetForm();
  popup.open(newItem);

});

// editProfileForm.addEventListener('submit', formSubmitHandler);
// newItemForm.addEventListener('submit', (e) => {
//   e.preventDefault();

//   const dataNewItem = {
//     name: newItemFormName.value,
//     link: newItemFormLink.value,
//   };

//   renderCard(elementsContainer, createCard(dataNewItem));
  
//   popup.close(newItem);
// });



console.dir(document.querySelector('.popup__input'));