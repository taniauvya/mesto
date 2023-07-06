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
    this._likeElement.classList.toggle('card__like_checked');
  }

  _handleDeleteClick() {
    this._element.remove();
    this._element = null;
    this._imgElement = null;
    this._likeElement = null;
    this._cardDeleteButton = null;
    this._titleElement = null;
  }

  _setEventListeners() {
    this._cardDeleteButton.addEventListener('click', () => {
      this._handleDeleteClick();
    });

    this._imgElement.addEventListener('click', () => {
      this._handleImgClick();
    });
    
    this._likeElement.addEventListener('click', () => {
      this._handleLikeClick();
    });
  }

  generateCard() {
    
    this._element = this._getTemplate();
    this._imgElement = this._element.querySelector('.card__image');
    this._likeElement = this._element.querySelector('.card__like');
    this._cardDeleteButton = this._element.querySelector('.card__delete');
    this._titleElement = this._element.querySelector('.card__title');

    this._setEventListeners();

    this._imgElement.src = this._link;
    this._imgElement.alt = this._name;
    this._titleElement.textContent = this._name;

    return this._element;
  }
}


export { Card };