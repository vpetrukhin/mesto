import PopupWithImage from './PopupWithImage.js';
import {
  imagePopup,
  imagePopupImg,
  imagePopupTitle
} from '../utils/constans.js';

class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._title = data.name;
    this._image = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }
  
  getCard() {
    const cardTemlate = this._getCardTemplate();
    const card = cardTemlate.querySelector('.element').cloneNode(true);

    
    const cardImage = card.querySelector('.element__image');
    const cardTitle = card.querySelector('.element__title');
    
    cardImage.src = this._image;
    cardImage.alt = this._title;
    cardTitle.textContent = this._title;

    this._setEventListener(card, cardImage);

    return card;
  }

  _setEventListener(card, cardImage) {
    const likeBtn = card.querySelector('.element__like-btn');
    const removeBtn = card.querySelector('.element__remove-btn');
    

    likeBtn.addEventListener('click', this._addLike);
    removeBtn.addEventListener('click', this._removeCard);
    cardImage.addEventListener('click', this._handleCardClick);
  }

  

  _getCardTemplate() {
    const cardTemlate = document.querySelector(this._templateSelector).content;

    return cardTemlate;
  }

  _addLike(e) {
    e.target.classList.toggle('element__like-btn_active');
  }

  _removeCard(e) {
    e.target.closest('.element').remove();
  }
}

function closeImageByEscape(e) {
  if (e.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closeImage(openedPopup);
  }
}

export default Card;