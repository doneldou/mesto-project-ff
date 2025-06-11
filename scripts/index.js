import initialCards from "./cards.js";
// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardsList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(cardData, removeCard) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__title").textContent = cardData.name;
  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(
    ".card__image"
  ).alt = `Изображение: ${cardData.name}`;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => removeCard(cardElement));

  return cardElement;
}

// @todo: Функция удаления карточки
function removeCard(cardElement) {
  // const eventTargetCard = evt.target.closest(".card");
  // eventTargetCard.remove();
  cardElement.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
  cardsList.append(createCard(item, removeCard));
});
