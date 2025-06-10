import initialCards from "./cards.js";
// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardsList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(name, link, removeCard) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__title").textContent = name;
  cardElement.querySelector(".card__image").src = link;

  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", removeCard);

  return cardElement;
}

// @todo: Функция удаления карточки
function removeCard(evt) {
  const eventTargetCard = evt.target.closest(".card");
  eventTargetCard.remove();
}

// @todo: Вывести карточки на страницу
for (let i = 0; i < initialCards.length; i++) {
  cardsList.append(
    createCard(initialCards[i].name, initialCards[i].link, removeCard)
  );
}
