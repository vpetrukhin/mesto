import {
  imagePopup,
  imagePopupImg,
  imagePopupTitle
} from './index.js';

class Card {
  constructor(data, templateSelector) {
    this._title = data.name;
    this._image = data.link;
    this._templateSelector = templateSelector;
  }
  
  getCard() {
    const cardTemlate = this._getCardTemplate();
    const card = cardTemlate.querySelector('.element').cloneNode(true);

    
    const cardImage = card.querySelector('.element__image');
    const cardTitle = card.querySelector('.element__title');
    
    cardImage.src = this._image;
    cardImage.alt = this._title;
    cardTitle.textContent = this._title;

    this._setEventListener(card);
    this._openImage(cardImage);

    return card;
  }

  _setEventListener(card) {
    const likeBtn = card.querySelector('.element__like-btn');
    const removeBtn = card.querySelector('.element__remove-btn');

    likeBtn.addEventListener('click', this._addLike);
    removeBtn.addEventListener('click', this._removeCard);
  }

  _openImage(cardImage) {
    cardImage.addEventListener('click', () => {

      imagePopupImg.src = this._image;
      imagePopupImg.alt = this._title;
      imagePopupTitle.textContent = this._title;

      imagePopup.classList.add('popup_opened');
    });
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

export default Card;