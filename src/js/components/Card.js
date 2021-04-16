
class Card {
  constructor(data, templateSelector, handleCardClick, handleDeleteClick, handleLike, userId) {
    this._title = data.name;
    this._image = data.link;
    this._cardId = data._id;
    this._cardOwnerId = data.owner._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLike = handleLike;
    this._mainUserId = userId;
    this._likes = data.likes;
  }

  getCardId() {
    return this._cardId;
  }
  
  getCard() {
    const cardTemlate = this._getCardTemplate();
    this._card = cardTemlate.querySelector('.element').cloneNode(true);

    
    this._cardImage = this._card.querySelector('.element__image');
    this._cardTitle = this._card.querySelector('.element__title');
    this._likeCounter = this._card.querySelector('.element__like-count');
    
    
    this._cardImage.src = this._image;
    this._cardImage.alt = this._title;
    this._cardTitle.textContent = this._title;

    this._setEventListener(this._card, this._cardImage);
    this._permitDeleteCard();
    if (this.findUserLike()) {
      this._setLikeCount(this._likes);
      this._addLike();
    } else {
      this._setLikeCount(this._likes);
      this._removeLike();
    }

    return this._card;
  }

  _permitDeleteCard() {
    if (this._cardOwnerId === this._mainUserId) {
      this._removeBtn.addEventListener('click',() => {this._handleDeleteClick(this)});
    } else {
      this._removeBtn.remove();
    }
  }

  handleLike(data) {
    this.refreshLikes(data);
  }

  refreshLikes(data) {
    if (this.findUserLike()) {
      this._removeLike();
      this._setLikeCount(data.likes);
    } else {
      this._addLike();
      this._setLikeCount(data.likes);
      
    }
  }

  refreshCardDataLikes(newData) {
    this._likes = newData.likes;
  }

  findUserLike() {
    return Boolean(this._likes.find(item => 
      item._id === this._mainUserId
    ));
  }

  _setLikeCount(data) {
    this._likeCounter.textContent = data.length;
  }

  _setEventListener(card, cardImage) {
    this._likeBtn = card.querySelector('.element__like-btn');
    this._removeBtn = card.querySelector('.element__remove-btn');
    
    this._likeBtn.addEventListener('click', this._handleLike);
    cardImage.addEventListener('click', this._handleCardClick);
  }

  

  _getCardTemplate() {
    const cardTemlate = document.querySelector(this._templateSelector).content;

    return cardTemlate;
  }

  _addLike() {
    this._likeBtn.classList.add('element__like-btn_active');
  }

  _removeLike() {
    this._likeBtn.classList.remove('element__like-btn_active');
  }

  removeCard() {
    this._card.remove();
  }
}


export default Card;