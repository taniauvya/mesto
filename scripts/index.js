//////////////////
// Popup zoom

const popupImageZoom = document.querySelector('.zoom-popup');
const zoomImage = popupImageZoom.querySelector('.popup__image-zoom');
const zoomTitle = popupImageZoom.querySelector('.popup__title-zoom');


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
const cardTemplate = document.querySelector('#card').content;


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


/** Создание новой карточки */
function createCard(cardData) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const imgEl = cardElement.querySelector('.card__image');
  imgEl.src = cardData.link;
  imgEl.alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;

  const cardDeleteButton = cardElement.querySelector('.card__delete');
  cardDeleteButton.addEventListener('click', (evt) => {
    const listItem = cardDeleteButton.closest('.card');
    listItem.remove();
  });

  imgEl.addEventListener('click', (evt) => {
    zoomImage.src = imgEl.src;
    zoomImage.alt = imgEl.alt;
    zoomTitle.textContent = imgEl.alt;
    openPopup(popupImageZoom);
  });

  const likeEl = cardElement.querySelector('.card__like');
  likeEl.addEventListener('click', (evt) => {
    likeEl.classList.toggle('card__like_checked');
  });

  return cardElement;
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
  resetErr(profilePopup, validationConfig);
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
    addImage({"link": e.link, "name": e.name}, true);
  });
});



///////////////////////////
// Popup добавления карточки

imageAddButton.addEventListener('click', evt => {
  resetErr(popupImageAdd, validationConfig);
  openPopup(popupImageAdd);
});

imageAddForm.addEventListener('submit', evt => {
  evt.preventDefault();

  addImage({"link": imageAddLinkInput.value, "name": imageAddNameInput.value}, false);

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