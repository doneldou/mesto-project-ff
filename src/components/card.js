import "../pages/index.css";

const cardTemplate = document.querySelector("#card-template").content;

function createCard(cardData, handlers) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = `Изображение: ${cardData.name}`;

  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", handlers.handleDelete);

  likeButton.addEventListener("click", handlers.handleLike);

  cardImage.addEventListener("click", handlers.handleImageClick);

  return cardElement;
}

function toggleLike(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}

export { createCard, toggleLike };
