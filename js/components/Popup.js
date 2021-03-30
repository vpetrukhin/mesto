class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open(popup) {
    popup.classList.add('popup_opened');
    popup.addEventListener('keydown', this._handleEscClose);
  }

  close(popup) {
    popup.classList.remove('popup_opened');
    popup.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(e) {
    console.log('fuuu');
    if (e.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened');
      // closePopup(openedPopup);
      this.close(openedPopup);
    }
  }

  setEventListeners(popup) {
    popup.addEventListener('click', (e) => {
      if (e.target.classList.contains('popup_opened')) {
        // closePopup(popup);
        this.close(popup);
      }
      if (e.target.classList.contains('popup__btn-close')) {
        // closePopup(popup);
        this.close(popup);
      }
    })
  }
}

export default Popup;