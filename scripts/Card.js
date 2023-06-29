//////////////////
// Popup zoom

import { openPopup } from './index.js'

const popupImageZoom = document.querySelector('.zoom-popup');
const zoomImage = popupImageZoom.querySelector('.popup__image-zoom');
const zoomTitle = popupImageZoom.querySelector('.popup__title-zoom');


class Card {

  constructor(data, templateSelector) {
    this._link = data.link;
    this._name = data.name;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  _handleImgClick() {
    zoomImage.src = this._link;
    zoomImage.alt = this._name;
    zoomTitle.textContent = this._name;
    openPopup(popupImageZoom);
  }

  _handleLikeClick() {
    this._element.querySelector('.card__like').classList.toggle('card__like_checked');
  }

  _handleDeleteClick() {
    this._element.remove();
  }

  _setEventListeners() {
    const cardDeleteButton = this._element.querySelector('.card__delete');
    cardDeleteButton.addEventListener('click', () => {
      this._handleDeleteClick();
    });

    const imgElement = this._element.querySelector('.card__image');
    imgElement.addEventListener('click', () => {
      this._handleImgClick();
    });

    const likeElement = this._element.querySelector('.card__like');
    likeElement.addEventListener('click', () => {
      this._handleLikeClick();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const imgElement = this._element.querySelector('.card__image');
    imgElement.src = this._link;
    imgElement.alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;

    return this._element;
  }
}


export { Card };