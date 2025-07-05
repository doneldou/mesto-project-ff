const cardTemplate = document.querySelector("#card-template").content;

function createCard(cardData, handlers) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  // Установка данных карточки
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = `Изображение: ${cardData.name}`;

  // Обработчики событий
  deleteButton.addEventListener("click", () =>
    handlers.handleDelete(cardElement)
  );
  likeButton.addEventListener("click", () => handlers.handleLike(likeButton));
  cardImage.addEventListener("click", () =>
    handlers.handleImageClick(cardData)
  );

  return cardElement;
}

function removeCard(cardElement) {
  cardElement.remove();
}

function toggleLike(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}

export { createCard, removeCard, toggleLike };
