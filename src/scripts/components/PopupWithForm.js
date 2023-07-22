import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {

    constructor(submitHandler, popupSelector) {
        super(popupSelector);
        this._submitHandler = submitHandler;
        this._form = super.getPopup().querySelector('.popup__form');
    }

    _getInputValues() {
        this._inputList = this._form.querySelectorAll('.popup__input');
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });

        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitHandler(this._getInputValues(), evt);
            this.close();
            this._form.reset();
        });
    }

    getForm() {
        return this._form;
    }

    close() {
        super.close();
    }
}
