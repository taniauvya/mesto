export default class Popup {
    
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._popup = document.querySelector(popupSelector);
        this._handleEscCloseBind = this._handleEscClose.bind(this);
    }

    /** Открытие попапа */
    open() {
        this._popup.addEventListener('keydown', this._handleEscCloseBind);
        this._popup.classList.add('popup_opened');
        this._popup.focus();
    }

    /** Закрытие попапа */
    close() {
        this._popup.removeEventListener('keydown', this._handleEscCloseBind);
        this._popup.classList.remove('popup_opened');
    }

    /** содержит логику закрытия попапа клавишей Esc */
    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    }

    /** добавляет слушатель клика иконке закрытия попапа.
     * Модальное окно также закрывается при клике на затемнённую область вокруг формы.*/
    setEventListeners() {
        // устанавливаем обработчик закрытия при нажатии вне формы
        this._popup.addEventListener('click', evt => {
            if (evt.target.classList.contains(this._popupSelector.substring(1))) {
                this.close();
            }
        });

        // устанавливаем обработчик закрытия на крестик
        const closeButton = this._popup.querySelector('.popup__close');
        closeButton.addEventListener('click', this.close.bind(this));
    }
}