class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }
  
  _handleEscClose(e) {
    if (e.key === 'Escape') {
      this._openedPopup = document.querySelector('.popup_opened');
      
      this.close(this._openedPopup);
    }
  }
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
  }


  setEventListeners() {
    this._popup.addEventListener('click', (e) => {
      if (e.target.classList.contains('popup_opened')) {
        this.close();
      }
      if (e.target.classList.contains('popup__btn-close')) {
        this.close();
      }
    })
  }
}

export default Popup;