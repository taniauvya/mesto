export default class Card {

  constructor({ data, selfId, handleCardClick, handleDeleteClick, handleLikeClick }, templateSelector) {
    this._id = data._id;
    this._link = data.link;
    this._name = data.name;
    this._likeCount = data.likes.length;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._canDelete = data.owner._id === selfId;
    this._doLike = data.likes.some(like => like._id === selfId);
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  getId() {
    return this._id;
  }

  delete() {
    this._element.remove();

    this._element = null;
    this._imgElement = null;
    this._likeElement = null;
    this._cardDeleteButton = null;
    this._titleElement = null;
    this._likeCountElement = null;
    this._cardDeleteContainer = null;
  }

  _setEventListeners() {
    this._cardDeleteButton.addEventListener('click', () => {
      this._handleDeleteClick(this);
    });

    this._imgElement.addEventListener('click', () => {
      this._handleCardClick({ name: this._name, link: this._link });
    });

    this._likeElement.addEventListener('click', () => {
      this._handleLikeClick(
        this._id,
        !this._likeElement.classList.contains('card__like_checked'),
        cardData => {
          this._likeCount = cardData.likes.length;
          this._likeCountElement.textContent = this._likeCount;
          this._likeElement.classList.toggle('card__like_checked');
        });
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._imgElement = this._element.querySelector('.card__image');
    this._likeElement = this._element.querySelector('.card__like');
    this._likeCountElement = this._element.querySelector('.card__like-count');
    this._cardDeleteButton = this._element.querySelector('.card__delete');
    this._cardDeleteContainer = this._element.querySelector('.card__delete-container');
    this._titleElement = this._element.querySelector('.card__title');

    this._setEventListeners();

    this._imgElement.src = this._link;
    this._imgElement.alt = this._name;
    this._titleElement.textContent = this._name;
    this._likeCountElement.textContent = this._likeCount;
    this._cardDeleteContainer.style.visibility = this._canDelete ? "visible" : "hidden";

    if (this._doLike)
      this._likeElement.classList.add('card__like_checked');

    return this._element;
  }
}