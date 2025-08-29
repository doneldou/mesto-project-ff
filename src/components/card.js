import { userId } from "../index.js";
import { unlikeCard, likeCard } from "./api.js";

const cardTemplate = document.querySelector("#card-template").content;

function createCard(cardData, handlers) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeCount = cardElement.querySelector(".card__like-count");

  // Установка данных карточки
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = `Изображение: ${cardData.name}`;
  likeCount.textContent = cardData.likes.length;

  const hasObjectWithId = cardData.likes.some((item) => item._id === userId);

  if (hasObjectWithId) {
    handlers.handleLike(likeButton);
  }

  if (cardData.owner._id !== userId) {
    deleteButton.disabled = true;
    deleteButton.classList.add("card__delete-button-disabled");
  }
  // Обработчики событий
  deleteButton.addEventListener("click", () => {
    handlers.handleDeleteCard(cardElement, cardData._id);
  });

  likeButton.addEventListener("click", () => {
    if (likeButton.classList.contains("card__like-button_is-active")) {
      unlikeCard(cardData._id)
        .then((res) => {
          likeCount.textContent = res.likes.length;
          handlers.handleLike(likeButton);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      likeCard(cardData._id)
        .then((res) => {
          likeCount.textContent = res.likes.length;
          handlers.handleLike(likeButton);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

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
