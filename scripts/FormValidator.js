class FormValidator {

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
    _hasInvalidInput(inputs) {
        return inputs.some(inputElement => {
            return !inputElement.validity.valid;
        });
    };

    /** Переключение активности кнопки сабмита */
    _toggleButtonState(inputs, buttonElement) {
        if (this._hasInvalidInput(inputs)) {
            buttonElement.classList.add(this._validationConfig.inactiveButtonClass);
            buttonElement.disabled = true;
        }
        else {
            buttonElement.classList.remove(this._validationConfig.inactiveButtonClass);
            buttonElement.disabled = false;
        }
    };

    /** Установка обработчиков валидации */
    _setEventListeners() {
        const inputs = Array.from(this._formElement.querySelectorAll(this._validationConfig.inputSelector));
        const buttonElement = this._formElement.querySelector(this._validationConfig.submitButtonSelector);
        this._toggleButtonState(inputs, buttonElement);
        inputs.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(inputs, buttonElement);
            });
        });
    };

    /** Сброс ошибки когда форма пустая или когда форма заполняется перед открытием */
    resetErr() {
        const inputs = Array.from(this._formElement.querySelectorAll(this._validationConfig.inputSelector));

        // Сбрасывает ошибки если все инпуты пустые
        const allEmpty = inputs.every(inputElement => inputElement.value === '');
        if (allEmpty) {
            inputs.forEach(inputElement => {
                this._hideInputError(inputElement);
            });
        }
        else {
            inputs.forEach(inputElement => {
                this._checkInputValidity(inputElement);
            });
        }

        const buttonElement = this._formElement.querySelector(this._validationConfig.submitButtonSelector);
        this._toggleButtonState(inputs, buttonElement);
    }

    /** Включение валидации на формах */
    enableValidation() {
        this._formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });

        this._setEventListeners();
    }
}


export { FormValidator };