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


//////////////////
// Общие функции

function closePopupOnEscape(evt) {
  if (evt.key === "Escape") {
    closePopup(evt.currentTarget);
  }
}

function openPopup(popup) {
  resetErr(popup, validationConfig);
  //Слушатель событий, закрывающий модальное окно по нажатию на Esc , добавляется при открытии модального
  //окна и удаляется при его закрытии.
  popup.addEventListener('keydown', closePopupOnEscape);
  popup.classList.add('popup_opened');
  popup.focus();
}


function closePopup(popup) {
  popup.removeEventListener('keydown', closePopupOnEscape);
  popup.classList.remove('popup_opened');
}



//////////////////
// Popup zoom

const popupImageZoom = document.querySelector('.zoom-popup');
const zoomImage = popupImageZoom.querySelector('.popup__image-zoom');
const zoomTitle = popupImageZoom.querySelector('.popup__title-zoom');



///////////////////////////
// Popup профиля

// Находим форму в DOM
const profileForm = document.forms['edit-form'];
// Находим поля формы в DOM
const profileNameInput = profileForm.querySelector('.popup__input_type_name');
const profileJobInput = profileForm.querySelector('.popup__input_type_job');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const profileButtonEdit = document.querySelector('.profile__button-edit');
const profilePopup = document.querySelector('.edit-popup');

// Обработчик клика на кнопку
profileButtonEdit.addEventListener('click', () => {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
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

const cardsElement = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('#card').content;


function createCard(link, name) {
  const cardElement = cardTemplate.querySelector('.elements__card').cloneNode(true);
  const imgEl = cardElement.querySelector('.elements__image');
  imgEl.src = link;
  imgEl.alt = name;
  cardElement.querySelector('.elements__title').textContent = name;

  const cardDeleteButton = cardElement.querySelector('.elements__delete');
  cardDeleteButton.addEventListener('click', (evt) => {
    const listItem = cardDeleteButton.closest('.elements__card');
    listItem.remove();
  });

  imgEl.addEventListener('click', (evt) => {
    zoomImage.src = imgEl.src;
    zoomImage.alt = imgEl.alt;
    zoomTitle.textContent = imgEl.alt;
    openPopup(popupImageZoom);
  });

  const likeEl = cardElement.querySelector('.elements__like');
  likeEl.addEventListener('click', (evt) => {
    likeEl.classList.toggle('elements__like_checked');
  });

  return cardElement
}


function addImage(link, name, isInitial) {
  const cardElement = createCard(link, name);

  if (isInitial) {
    cardsElement.append(cardElement);
  }
  else {
    cardsElement.prepend(cardElement);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initialCards.forEach(e => {
    addImage(e.link, e.name, true);
  });
});



///////////////////////////
// Popup добавления карточки

// Находим форму в DOM
const imageAddForm = document.forms['add-form'];
// Находим поля формы в DOM
const imageAddNameInput = imageAddForm.querySelector('.popup__input_place_name');
const imageAddLinkInput = imageAddForm.querySelector('.popup__input_place_link');

const imageAddButton = document.querySelector('#place-button-add');
const popupImageAdd = document.querySelector('.add-popup');

// Обработчик клика на кнопку
imageAddButton.addEventListener('click', evt => {
  openPopup(popupImageAdd);
});

imageAddForm.addEventListener('submit', evt => {
  evt.preventDefault();

  addImage(imageAddLinkInput.value, imageAddNameInput.value, false);

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
