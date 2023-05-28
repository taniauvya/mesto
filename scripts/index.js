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
// Popup zoom

const zoomEl = document.querySelector('#zoom');
const zoomImgEl = zoomEl.querySelector(".zoom__image");
const zoomTitleEl = zoomEl.querySelector(".zoom__title");
const zoomCloseEl = zoomEl.querySelector("#zoom-button-close");

zoomCloseEl.addEventListener('click', (evt) => {
  zoomEl.classList.remove('zoom_opened');
});



///////////////////////////
// Popup профиля

// Находим форму в DOM
let formElement = document.querySelector('#edit-form'); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = document.querySelector('#name');
let jobInput = document.querySelector('#job');

let profileName = document.querySelector('#profile-name');
let profileJob = document.querySelector('#profile-job');


let buttonEdit = document.querySelector('#profile-button-edit');
let popup = document.querySelector('#popup-edit');
let popupButtonClose = document.querySelector('#popup-button-close');

// Обработчик клика на кнопку
buttonEdit.addEventListener('click', (evt) => {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
});

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    // Выберите элементы, куда должны быть вставлены значения полей
    // Вставьте новые значения с помощью textContent
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    popup.classList.remove('popup_opened');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);


popupButtonClose.addEventListener('click', (evt) => {
    popup.classList.remove('popup_opened');
});




//////////////////////////
// Начальная загрузка загрузка карточек

const cardsEl = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('#card').content;

function addImage(link, name, isInitial) {
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
    zoomImgEl.src = imgEl.src;
    zoomImgEl.alt = imgEl.alt;
    zoomTitleEl.textContent = imgEl.alt;
    zoomEl.classList.add('zoom_opened');
  });
  
  const likeEl = cardElement.querySelector('.elements__like');
  likeEl.addEventListener('click', (evt) => {
    likeEl.classList.toggle("elements__like_checked");
  });

  if (isInitial) {
    cardsEl.append(cardElement);
  }
  else {
    cardsEl.prepend(cardElement);
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
let formAddPlace = document.querySelector('#add-form');
// Находим поля формы в DOM
let placeNameInput = document.querySelector('#place-name');
let placeLinkInput = document.querySelector('#place-link');

let buttonAdd = document.querySelector('#place-button-add');
let popupAdd = document.querySelector('#popup-add');
let popupAddButtonClose = document.querySelector('#popup-add-button-close');

// Обработчик клика на кнопку
buttonAdd.addEventListener('click', (evt) => {
    placeLinkInput.value = '';
    placeNameInput.value = '';
    popupAdd.classList.add('popup_opened');
});

function handleFormAddSubmit(evt) {
    evt.preventDefault();
    
    addImage(placeLinkInput.value, placeNameInput.value, false);

    popupAdd.classList.remove('popup_opened');
}

formAddPlace.addEventListener('submit', handleFormAddSubmit);


popupAddButtonClose.addEventListener('click', (evt) => {
    popupAdd.classList.remove('popup_opened');
});
