import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {

    constructor(submitHandler, submitTextInProgress, popupSelector) {
        super(popupSelector);
        this._submitHandler = submitHandler;
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = this._form.querySelectorAll('.popup__input');
        this._submitButton = this._form.querySelector('.popup__submit');
        this._submitTextInProgress = submitTextInProgress;
        this._submitText = this._submitButton.textContent;
    }

    _getInputValues() {
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
            this._submitButton.textContent = this._submitTextInProgress;
            const promise = this._submitHandler(this._getInputValues(), evt);
            promise.then(() => this.close());
        });
    }

    setInputValues(data) {
        this._inputList.forEach((input) => {
          // тут вставляем в `value` инпута данные из объекта по атрибуту `name` этого инпута
          input.value = data[input.name];
        });
      }

    getForm() {
        return this._form;
    }

    close() {
        super.close();
        this._submitButton.textContent = this._submitText;
        this._form.reset();
    }
}
