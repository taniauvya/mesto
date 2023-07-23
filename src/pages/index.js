import './index.css';

import Card from '../scripts/components/Card.js';
import Section from '../scripts/components/Section.js';
import FormValidator from '../scripts/components/FormValidator.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';

import {
  validationConfig,
  initialCards,
  cardSelector,
  zoomPopupSelector,
  cardSectionSelector,
  userInfoPopupSelector,
  profileButtonEditSelector,
  profileNameInputSelector,
  profileInfoInputSelector,
  imageAddButtonSelector,
  popupImageAddSelector,
} from '../scripts/utils/constants.js';


///////////////////////////
// Popup zoom картинки

const popupImageZoom = new PopupWithImage(zoomPopupSelector);
popupImageZoom.setEventListeners();

///////////////////////////
// Карточки

function handlerCardClick(cardData) {
  popupImageZoom.setImageData(cardData);
  popupImageZoom.open();
}

/** Создание карточки */
function createCard(cardData) {
  const card = new Card({ data: cardData, handleCardClick: handlerCardClick }, cardSelector);
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
  , cardSectionSelector
);





///////////////////////////
// Popup профиля

const profilePopup = new PopupWithForm(({ name, info }) => {
  userInfo.setUserInfo({ name, info })
}, userInfoPopupSelector);
profilePopup.setEventListeners();

const profileButtonEdit = document.querySelector(profileButtonEditSelector);

const userInfo = new UserInfo(profileNameInputSelector, profileInfoInputSelector);



profileButtonEdit.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  profilePopup.setInputValues(userData);
  formValidators[profilePopup.getForm().getAttribute('name')].resetValidation();
  profilePopup.open();
});


///////////////////////////
// Popup добавления карточки

const imageAddButton = document.querySelector(imageAddButtonSelector);

const popupImageAdd = new PopupWithForm(({ placeLink: link, placeName: name }, evt) => {
  addImage(cardSection, { "link": link, "name": name }, false);
}
  , popupImageAddSelector);
popupImageAdd.setEventListeners();

imageAddButton.addEventListener('click', evt => {
  formValidators[popupImageAdd.getForm().getAttribute('name')].resetValidation();
  popupImageAdd.open();
});


//////////////////////////
// Начальная загрузка загрузка карточек

document.addEventListener('DOMContentLoaded', () => {
  cardSection.renderItems();
});


////////////////////////////////
// Включение валидации на формах

const formValidators = {}

// Включение валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    // получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name');

    // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationConfig);