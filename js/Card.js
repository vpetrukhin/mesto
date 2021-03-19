
class Card {
  constructor(data, tamplateSelector) {
    this._title = data.name;
    this._image = data.link;
    this._tamplateSelector = tamplateSelector;
  }
  
  _getCard() {
    const cardTemlate = document.querySelector(this._tamplateSelector).content;
    const card = cardTemlate.querySelector('.element').cloneNode(true);

    const likeBtn = card.querySelector('.element__like-btn');
    const removeBtn = card.querySelector('.element__remove-btn');
    const cardImage = card.querySelector('.element__image');
    const cardTitle = card.querySelector('.element__title');
    const imagePopup = document.querySelector('.image-popup');
    const imagePopupImg = imagePopup.querySelector('.image-popup__img');
    const imagePopupTitle = imagePopup.querySelector('.image-popup__title');

    cardImage.src = this._image;
    cardImage.alt = this._title;
    cardTitle.textContent = this._title;

    likeBtn.addEventListener('click', this._addLike);
    removeBtn.addEventListener('click', this._removeCard);
    cardImage.addEventListener('click', () => {

      imagePopupImg.src = this._image;
      imagePopupImg.alt = this._title;
      imagePopupTitle.textContent = this._title;
      imagePopup.classList.add('popup_opened');
    });

    return card;
  }

  _addLike(e) {
    e.target.classList.toggle('element__like-btn_active');
  }

  _removeCard(e) {
    e.target.closest('.element').remove();
  }
}

export default Card;