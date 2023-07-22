import './pages/index.css';

import Card from './scripts/components/Card.js';
import Section from './scripts/components/Section.js';
import FormValidator from './scripts/components/FormValidator.js';
import PopupWithForm from './scripts/components/PopupWithForm.js';
import UserInfo from './scripts/components/UserInfo.js';
import PopupWithImage from './scripts/components/PopupWithImage.js';

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
// Карточки

function handlerCardClick(cardData) {
  const popupImageZoom = new PopupWithImage(cardData, '.zoom-popup');
  popupImageZoom.setEventListeners();
  popupImageZoom.open();
}

/** Создание карточки */
function createCard(cardData) {
  const card = new Card({data: cardData, handleCardClick: handlerCardClick}, '#card');
  return card.generateCard();
}

/** Добавление карточки в DOM */
function addImage(cardSection, cardData, isAppend) {
  const cardElement = createCard(cardData);
  cardSection.addItem(cardElement, isAppend);
}

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      addImage(cardSection, item, true);
    }
  }
  , '.elements__list'
);





///////////////////////////
// Popup профиля

const profilePopup = new PopupWithForm(({name, info}) => {
  userInfo.setUserInfo({name, info})
}, '.edit-popup');
profilePopup.setEventListeners();

const profileNameInput = profilePopup.getForm().querySelector('.popup__input_type_name');
const profileInfoInput = profilePopup.getForm().querySelector('.popup__input_type_job');
const profileButtonEdit = document.querySelector('.profile__button-edit');

const userInfo = new UserInfo('.profile__name', '.profile__job');



profileButtonEdit.addEventListener('click', () => {
  const {name, info} = userInfo.getUserInfo();
  profileNameInput.value = name;
  profileInfoInput.value = info;
  profileFormValidator.resetErr();
  profilePopup.open();
});


///////////////////////////
// Popup добавления карточки

const imageAddButton = document.querySelector('#place-button-add');

const popupImageAdd = new PopupWithForm(({placeLink: link, placeName: name}, evt) => {
  addImage(cardSection, { "link": link, "name": name }, false);
  evt.target.reset();
}
,'.add-popup');
popupImageAdd.setEventListeners();

imageAddButton.addEventListener('click', evt => {
  imageAddFormValidator.resetErr();
  popupImageAdd.open();
});


//////////////////////////
// Начальная загрузка загрузка карточек

document.addEventListener('DOMContentLoaded', () => {
  cardSection.renderItems();
});


////////////////////////////////
// Включение валидации на формах

const profileFormValidator = new FormValidator(validationConfig, profilePopup.getForm());
profileFormValidator.enableValidation();

const imageAddFormValidator = new FormValidator(validationConfig, popupImageAdd.getForm());
imageAddFormValidator.enableValidation();
