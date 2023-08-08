import './index.css';

import { api } from '../scripts/components/Api.js';
import Card from '../scripts/components/Card.js';
import Section from '../scripts/components/Section.js';
import FormValidator from '../scripts/components/FormValidator.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithConfirmation from '../scripts/components/PopupWithConfirmation';

import {
  validationConfig,
  cardSelector,
  zoomPopupSelector,
  cardSectionSelector,
  userInfoPopupSelector,
  profileButtonEditSelector,
  profileNameInputSelector,
  profileInfoInputSelector,
  imageAddButtonSelector,
  popupImageAddSelector,
  popupImageDeleteSelector,
  avatarPopupSelector,
  avatarImageSelector,
  avatarEditButtonSelector,
} from '../scripts/utils/constants.js';


// ID пользователя, определяется при начальной загрузке пользователя/карточек
let selfId;

// Аватар пользователя
const profileImage = document.querySelector(avatarImageSelector);


///////////////////////////
// Popup zoom картинки

const popupImageZoom = new PopupWithImage(zoomPopupSelector);
popupImageZoom.setEventListeners();

///////////////////////////
// Карточки

function handlerCardClick(cardData) {
  popupImageZoom.open(cardData);
}

function handlerDeleteClick(card) {
  popupImageDelete.setCard(card);
  popupImageDelete.open();
}

function handlerLikeClick(cardId, doLike, cardCallbak) {
  api.updateLikeCard(cardId, doLike)
    .then(data => {
      cardCallbak(data);
    })
    .catch(err => {
      console.log(err);
    });
}

/** Создание карточки */
function createCard(cardData, selfId) {
  const card = new Card(
    {
      data: cardData,
      selfId,
      handleCardClick: handlerCardClick,
      handleDeleteClick: handlerDeleteClick,
      handleLikeClick: handlerLikeClick
    },
    cardSelector
  );
  return card.generateCard();
}

/** Добавление карточки в DOM */
function addImage(cardSection, cardData, isAppend, selfId) {
  const cardElement = createCard(cardData, selfId);
  cardSection.addItem(cardElement, isAppend);
}

const cardSection = new Section(
  {
    items: [],
    renderer: (item) => {
      addImage(cardSection, item, true, selfId);
    }
  }
  , cardSectionSelector
);


///////////////////////////
// Popup профиля

const profilePopup = new PopupWithForm(({ name, info }) => {
  return api.updateUserData({ name, about: info })
    .then(userData => {
      userInfo.setUserInfo({ name: userData.name, info: userData.about });
      profilePopup.close();
    })
    .catch(err => {
      console.log(err);
    });
}
  , 'Сохранение...'
  , userInfoPopupSelector
);
profilePopup.setEventListeners();

const profileButtonEdit = document.querySelector(profileButtonEditSelector);

const userInfo = new UserInfo(profileNameInputSelector, profileInfoInputSelector);

profileButtonEdit.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  profilePopup.setInputValues(userData);
  formValidators[profilePopup.getForm().getAttribute('name')].resetValidation();
  profilePopup.open();
});


const avatarPopup = new PopupWithForm(({ avatarLink }) => {
  return api.updateAvatar(avatarLink)
    .then(userData => {
      profileImage.src = userData.avatar;
      avatarPopup.close();
    })
    .catch(err => {
      console.log(err);
    });
}
  , 'Сохранение...'
  , avatarPopupSelector
);
avatarPopup.setEventListeners();

const avatarEditButton = document.querySelector(avatarEditButtonSelector);
avatarEditButton.addEventListener('click', evt => {
  formValidators[avatarPopup.getForm().getAttribute('name')].resetValidation();
  avatarPopup.open();
});

///////////////////////////
// Popup добавления карточки

const imageAddButton = document.querySelector(imageAddButtonSelector);

const popupImageAdd = new PopupWithForm(
  ({ placeLink: link, placeName: name }, evt) => {
    const cardData = { "link": link, "name": name };
    return api.addCard(cardData)
      .then(cardData => {
        addImage(cardSection, cardData, false, selfId);
        popupImageAdd.close();
      })
      .catch(err => {
        console.log(err);
      });
  }
  , 'Создание...'
  , popupImageAddSelector
);
popupImageAdd.setEventListeners();

imageAddButton.addEventListener('click', evt => {
  formValidators[popupImageAdd.getForm().getAttribute('name')].resetValidation();
  popupImageAdd.open();
});


///////////////////////////
// Popup удаления карточки

const popupImageDelete = new PopupWithConfirmation(card => {
  api.deleteCard(card.getId())
    .then(() => {
      card.delete();
      popupImageDelete.close();
    })
    .catch(err => {
      console.log(err);
    });
}, popupImageDeleteSelector);
popupImageDelete.setEventListeners();


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



//////////////////////////
// Начальная загрузка

const userDataPromise = api.getUserData();
const initialCardsPromise = api.getInitialCards();

Promise.all([userDataPromise, initialCardsPromise])
  .then(([userData, initialCardsData]) => {

    selfId = userData._id;

    userInfo.setUserInfo({ name: userData.name, info: userData.about });
    profileImage.src = userData.avatar;

    cardSection.setItems(initialCardsData);
    cardSection.renderItems();
  }
  ).catch(err => {
    console.log(err);
  });