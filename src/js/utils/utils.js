export default function setSubmitBtnText(popupSelector, text) {
  const openPopup = document.querySelector(popupSelector);
  const submitBtn = openPopup.querySelector('.popup__btn');

  submitBtn.textContent = text;
}