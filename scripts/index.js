import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';


///////////////////////////
// Параметры валидации

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

///////////////////////////
// Начальные карточки

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

///////////////////////////
// Popup профиля

const profileForm = document.forms['edit-form'];
const profileNameInput = profileForm.querySelector('.popup__input_type_name');
const profileJobInput = profileForm.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const profileButtonEdit = document.querySelector('.profile__button-edit');
const profilePopup = document.querySelector('.edit-popup');

///////////////////////////
// Карточки

const cardsElement = document.querySelector('.elements__list');


///////////////////////////
// Popup добавления карточки

const imageAddForm = document.forms['add-form'];
const imageAddNameInput = imageAddForm.querySelector('.popup__input_place_name');
const imageAddLinkInput = imageAddForm.querySelector('.popup__input_place_link');
const imageAddButton = document.querySelector('#place-button-add');
const popupImageAdd = document.querySelector('.add-popup');

////////////////////////////////////////


//////////////////
// Общие функции

/** Обработчик keydown в попапах - закрывает попап при нажатии Escape */
function handlePopupKeydown(evt) {
  if (evt.key === "Escape") {
    closePopup(evt.currentTarget);
  }
}

/** Общая функция открытия попапа */
function openPopup(popup) {
  //Слушатель событий, закрывающий модальное окно по нажатию на Esc , добавляется при открытии модального
  //окна и удаляется при его закрытии.
  popup.addEventListener('keydown', handlePopupKeydown);
  popup.classList.add('popup_opened');
  popup.focus();
}

/** Общая функция закрытия попапа */
function closePopup(popup) {
  popup.removeEventListener('keydown', handlePopupKeydown);
  popup.classList.remove('popup_opened');
}

/////////////////////////////////////

/** Создание карточки */
function createCard(cardData) {
  const card = new Card(cardData, '#card');
  return card.generateCard();
}


/** Добавление карточки в DOM */
function addImage(cardData, isAppend) {
  
  const cardElement = createCard(cardData);

  if (isAppend) {
    cardsElement.append(cardElement);
  }
  else {
    cardsElement.prepend(cardElement);
  }
}

///////////////////////////
// Popup профиля

profileButtonEdit.addEventListener('click', () => {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
  profileFormValidator.resetErr();
  openPopup(profilePopup);
});

profileForm.addEventListener('submit', evt => {
  evt.preventDefault();

  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;

  closePopup(profilePopup);
});



//////////////////////////
// Начальная загрузка загрузка карточек

document.addEventListener('DOMContentLoaded', () => {
  initialCards.forEach(e => {
    addImage({ "link": e.link, "name": e.name }, true);
  });
});



///////////////////////////
// Popup добавления карточки

imageAddButton.addEventListener('click', evt => {
  imageAddFormValidator.resetErr();
  openPopup(popupImageAdd);
});

imageAddForm.addEventListener('submit', evt => {
  evt.preventDefault();

  addImage({ "link": imageAddLinkInput.value, "name": imageAddNameInput.value }, false);

  evt.target.reset();

  closePopup(popupImageAdd);
});



////////////////////////////////
// Закрытие popup

// находим все крестики проекта по универсальному селектору
const closeButtons = document.querySelectorAll('.popup__close');

// с окончанием `s` нужно обязательно, так как много кнопок
closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап 
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));
});


////////////////////////////////
// Закрытие popup по нажатию на оверлей

const popups = document.querySelectorAll('.popup');

// с окончанием `s` нужно обязательно, так как много кнопок
popups.forEach(popup => {
  popup.addEventListener('click', evt => {
    if (evt.target.classList.contains('popup')) {
      closePopup(popup);
    }
  });
});


////////////////////////////////
// Включение валидации на формах

const profileFormValidator = new FormValidator(validationConfig, profileForm);
profileFormValidator.enableValidation();

const imageAddFormValidator = new FormValidator(validationConfig, imageAddForm);
imageAddFormValidator.enableValidation();

export { openPopup };