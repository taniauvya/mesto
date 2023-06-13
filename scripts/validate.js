const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};


/** Отображение текста ошибки валидации */
function showInputError(formElement, inputElement, errorMessage, validationConfig) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationConfig.errorClass);
};


/** Скрытие текста ошибки валидации */
function hideInputError(formElement, inputElement, validationConfig) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = '';
};

/** Отображение текста результата валидации - скрытие или отображение ошибки */
function checkInputValidity(formElement, inputElement, validationConfig) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
    } else {
        hideInputError(formElement, inputElement, validationConfig);
    }
};

/** Проверка валидности формы */
function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

/** Переключение активности кнопки сабмита */
function toggleButtonState(inputList, buttonElement, validationConfig) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(validationConfig.inactiveButtonClass);
        buttonElement.disabled = true;
    }
    else {
        buttonElement.classList.remove(validationConfig.inactiveButtonClass);
        buttonElement.disabled = false;
    }
};


/** Установка обработчиков валидации */
function setEventListeners(formElement, validationConfig) {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, validationConfig);
    inputList.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, validationConfig);
            toggleButtonState(inputList, buttonElement, validationConfig);
        });
    });
};


/** Включение валидации на формах */
function enableValidation(validationConfig) {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });

        setEventListeners(formElement, validationConfig);
    });
}

/** Сброс ошибки когда форма пустая или когда форма заполняется перед открытием */
function resetErr(popup, validationConfig) {
    const formElement = popup.querySelector(validationConfig.formSelector);

    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));

    // Сбрасывает ошибки если все инпуты пустые 
    const allEmpty = inputList.every(inputElement => inputElement.value === '');
    if (allEmpty) {
        inputList.forEach(inputElement => {
            hideInputError(formElement, inputElement, validationConfig);
        });
    }
    else {
        inputList.forEach(inputElement => {
            checkInputValidity(formElement, inputElement, validationConfig);
        });
    }

    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, validationConfig);
}



enableValidation(validationConfig);