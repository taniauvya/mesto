export default class FormValidator {

    constructor(validationConfig, formElement) {
        this._validationConfig = validationConfig;
        this._formElement = formElement;
    }

    /** Отображение текста ошибки валидации */
    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._validationConfig.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._validationConfig.errorClass);
    }

    /** Скрытие текста ошибки валидации */
    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._validationConfig.inputErrorClass);
        errorElement.classList.remove(this._validationConfig.errorClass);
        errorElement.textContent = '';
    };

    /** Отображение текста результата валидации - скрытие или отображение ошибки */
    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };

    /** Проверка валидности формы */
    _hasInvalidInput() {
        return this._inputs.some(inputElement => {
            return !inputElement.validity.valid;
        });
    };

    /** Переключение активности кнопки сабмита */
    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._buttonElement.classList.add(this._validationConfig.inactiveButtonClass);
            this._buttonElement.disabled = true;
        }
        else {
            this._buttonElement.classList.remove(this._validationConfig.inactiveButtonClass);
            this._buttonElement.disabled = false;
        }
    };

    /** Установка обработчиков валидации */
    _setEventListeners() {
        this._toggleButtonState();
        this._inputs.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    };

    /** Сброс ошибки когда форма пустая или когда форма заполняется перед открытием */
    resetErr() {
        // Сбрасывает ошибки если все инпуты пустые
        const allEmpty = this._inputs.every(inputElement => inputElement.value === '');
        if (allEmpty) {
            this._inputs.forEach(inputElement => {
                this._hideInputError(inputElement);
            });
        }
        else {
            this._inputs.forEach(inputElement => {
                this._checkInputValidity(inputElement);
            });
        }

        this._toggleButtonState();
    }

    /** Включение валидации на формах */
    enableValidation() {
        this._inputs = Array.from(this._formElement.querySelectorAll(this._validationConfig.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._validationConfig.submitButtonSelector);
        this._setEventListeners();
    }
}