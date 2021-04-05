
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

    
    this._cardImage = card.querySelector('.element__image');
    this._cardTitle = card.querySelector('.element__title');
    
    this._cardImage.src = this._image;
    this._cardImage.alt = this._title;
    this._cardTitle.textContent = this._title;

    this._setEventListener(card, this._cardImage);

    return card;
  }

  _setEventListener(card, cardImage) {
    this._likeBtn = card.querySelector('.element__like-btn');
    this._removeBtn = card.querySelector('.element__remove-btn');
    

    this._likeBtn.addEventListener('click', this._addLike);
    this._removeBtn.addEventListener('click', this._removeCard);
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


export default Card;