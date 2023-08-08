import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);

        this._zoomImageElement = document.querySelector('.popup__image-zoom');
        this._zoomTitleElement = document.querySelector('.popup__title-zoom');
    }

    open({ link, name }) {
        this._zoomImageElement.src = link;
        this._zoomImageElement.alt = name;
        this._zoomTitleElement.textContent = name;
        super.open();
    }
}