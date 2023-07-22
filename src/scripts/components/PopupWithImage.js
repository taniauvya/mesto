import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor({link, name}, popupSelector) {
        super(popupSelector);

        this._imageSrc = link;
        this._imageText = name;
        this._zoomImageElement = document.querySelector('.popup__image-zoom');
        this._zoomTitleElement = document.querySelector('.popup__title-zoom');
    }

    open() {
        this._zoomImageElement.src = this._imageSrc;
        this._zoomImageElement.alt = this._imageText;
        this._zoomTitleElement.textContent = this._imageText;
        super.open();
    }
}