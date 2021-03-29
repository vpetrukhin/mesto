class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
  }

  open() {
    this._popup.classList.add('popup_opened');
  }

  close() {
    this._popup.classList.remove('popup_opened');
  }

  _handleEscClose(e) {
    if (e.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened');
      // closePopup(openedPopup);
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('click', (e) => {
      if (e.target.classList.contains('popup_opened')) {
        // closePopup(popup);
        this.close();
      }
      if (e.target.classList.contains('popup__btn-close')) {
        // closePopup(popup);
        this.close();
      }
    })
  }

}