// Находим форму в DOM
let formElement = document.querySelector('#edit-form') // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = document.querySelector('#name')
let jobInput = document.querySelector('#job')

let profileName = document.querySelector('#profile-name')
let profileJob = document.querySelector('#profile-job')


let buttonEdit = document.querySelector('#profile-button-edit')
let popup = document.querySelector('#popup-edit')
let popupButtonClose = document.querySelector('#popup-button-close')

// Обработчик клика на кнопку
buttonEdit.addEventListener('click', (evt) => {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
})

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
})

