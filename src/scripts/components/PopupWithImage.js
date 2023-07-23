import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);

        this._zoomImageElement = document.querySelector('.popup__image-zoom');
        this._zoomTitleElement = document.querySelector('.popup__title-zoom');
    }

    setImageData({ link, name }) {
        this._imageSrc = link;
        this._imageText = name;
    }

    open() {
        this._zoomImageElement.src = this._imageSrc;
        this._zoomImageElement.alt = this._imageText;
        this._zoomTitleElement.textContent = this._imageText;
        super.open();
    }
}