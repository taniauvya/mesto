import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {

    constructor(submitHandler, popupSelector) {
        super(popupSelector);
        this._submitHandler = submitHandler;
        this._form = this._popup.querySelector('.popup__form');
    }

    setCard(card) {
        this._card = card;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitHandler(this._card);
        });
    }
}
