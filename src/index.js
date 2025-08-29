import { openModal, closeModal } from "./components/modal.js";
import { createCard, removeCard, toggleLike } from "./components/card.js";
import { elements, validationConfig } from "./utils/constants.js";
import "./pages/index.css";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  getUserInfo,
  getIninitialCards,
  updateUserProfile,
  addNewCard,
  updateAvatar,
  deleteCard,
} from "./components/api.js";
import { handleSubmit } from "./utils/utils.js";

export let userId = "";

Promise.all([getUserInfo(), getIninitialCards()])
  .then(([userData, cardsData]) => {
    userId = userData._id;
    updateProfile(userData);
    init(cardsData);
  })
  .catch((err) => console.log(err));

function updateProfile(userData) {
  elements.avatarIcon.style.backgroundImage = `url(${userData.avatar})`;
  elements.profileName.textContent = userData.name;
  elements.profileDesc.textContent = userData.about;
}

enableValidation(validationConfig);

// Обработчики карточек
const cardHandlers = {
  handleDelete: removeCard,
  handleDeleteCard: handleDeleteCard,
  handleLike: toggleLike,
  handleImageClick: (cardData) => {
    elements.popupImage.src = cardData.link;
    elements.popupImage.alt = `Увеличенное изображение: ${cardData.name}`;
    elements.popupCaption.textContent = cardData.name;
    openModal(elements.imageModal);
  },
};

function handleDeleteCard(cardElement, cardId) {
  deleteCard(cardId)
    .then(() => {
      cardHandlers.handleDelete(cardElement);
    })
    .catch((err) => console.log(err));
}

// Функции работы с карточками
function renderCard(cardData) {
  const card = createCard(cardData, cardHandlers);
  elements.cardsList.prepend(card);
}

function initializeCards(cardData) {
  cardData.forEach(renderCard);
}

// Работа с формами
function handleEditSubmit(evt) {
  const makeRequest = () => {
    return updateUserProfile(elements.nameInput.value, elements.jobInput.value)
      .then((updateData) => {
        elements.profileName.textContent = updateData.name;
        elements.profileDesc.textContent = updateData.about;
        closeModal(elements.editModal);
      })
      .catch((err) => console.log(err));
  };
  handleSubmit(makeRequest, evt);
}

function handleAddSubmit(evt) {
  const makeRequest = () => {
    return addNewCard(
      elements.cardNameInput.value,
      elements.cardLinkInput.value
    )
      .then((cardData) => {
        renderCard(cardData);
        closeModal(elements.addModal);
      })
      .catch((err) => console.log(err));
  };
  handleSubmit(makeRequest, evt);
}

function handleAvaEditSubmit(evt) {
  const makeRequest = () => {
    return updateAvatar(elements.avatarEditInput.value)
      .then(() => {
        elements.avatarIcon.style.backgroundImage = `url(${elements.avatarEditInput.value})`;
        closeModal(elements.editAvatarModal);
      })
      .catch((err) => console.log(err));
  };
  handleSubmit(makeRequest, evt);
}

// Инициализация
function setupEventListeners() {
  // Кнопки открытия попапов
  elements.editButton.addEventListener("click", () => {
    elements.nameInput.value = elements.profileName.textContent;
    elements.jobInput.value = elements.profileDesc.textContent;
    clearValidation(elements.editForm, validationConfig);
    openModal(elements.editModal);
  });

  elements.addButton.addEventListener("click", () => {
    elements.addForm.reset();
    clearValidation(elements.addForm, validationConfig);

    openModal(elements.addModal);
  });

  elements.avatarIcon.addEventListener("click", () => {
    elements.avatarForm.reset();
    clearValidation(elements.avatarForm, validationConfig);
    openModal(elements.editAvatarModal);
  });

  // Обработчики форм
  elements.editForm.addEventListener("submit", handleEditSubmit);
  elements.addForm.addEventListener("submit", handleAddSubmit);
  elements.avatarForm.addEventListener("submit", handleAvaEditSubmit);

  // Закрытие попапов
  document.querySelectorAll(".popup__close").forEach((btn) => {
    btn.addEventListener("click", () => {
      closeModal(btn.closest(".popup"));
    });
  });
}

// Запуск приложения
function init(cardData) {
  setupEventListeners();
  initializeCards(cardData);
}
