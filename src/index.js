import { openModal, closeModal } from "./components/modal.js";
import { createCard, removeCard, toggleLike } from "./components/card.js";

import "./pages/index.css";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  getUserInfo,
  getIninitialCards,
  updateUserProfile,
  addNewCard,
  updateAvatar,
} from "./components/api.js";

export let userId = "";

Promise.all([getUserInfo(), getIninitialCards()]).then(
  ([userData, cardsData]) => {
    userId = userData._id;
    updateProfile(userData);
    init(cardsData);
  }
);

function updateProfile(userData) {
  elements.avatarIcon.style.backgroundImage = `url(${userData.avatar})`;
  document.querySelector(".profile__title").textContent = userData.name;
  document.querySelector(".profile__description").textContent = userData.about;
}

// DOM элементы/
const elements = {
  editButton: document.querySelector(".profile__edit-button"),
  addButton: document.querySelector(".profile__add-button"),
  avatarIcon: document.querySelector(".profile__image"),
  cardsList: document.querySelector(".places__list"),
  profileName: document.querySelector(".profile__title"),
  profileDesc: document.querySelector(".profile__description"),
  editModal: document.querySelector(".popup_type_edit"),
  addModal: document.querySelector(".popup_type_new-card"),
  imageModal: document.querySelector(".popup_type_image"),
  editAvatarModal: document.querySelector(".popup_type_avatar_edit"),
  editForm: document.forms["edit-profile"],
  addForm: document.forms["new-place"],
  avatarForm: document.forms["edit-avatar"],
  nameInput: document.querySelector(".popup__input_type_name"),
  jobInput: document.querySelector(".popup__input_type_description"),
  cardNameInput: document.querySelector(".popup__input_type_card-name"),
  cardLinkInput: document.querySelector(".popup__input_type_url"),
  avatarEditInput: document.querySelector(".popup__input_type_avatar"),
  popupImage: document.querySelector(".popup_type_image .popup__image"),
  popupCaption: document.querySelector(".popup_type_image .popup__caption"),
};

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(validationConfig);

// Обработчики карточек
const cardHandlers = {
  handleDelete: removeCard,
  handleLike: toggleLike,
  handleImageClick: (cardData) => {
    elements.popupImage.src = cardData.link;
    elements.popupImage.alt = `Увеличенное изображение: ${cardData.name}`;
    elements.popupCaption.textContent = cardData.name;
    openModal(elements.imageModal);
  },
};

// Функции работы с карточками
function renderCard(cardData) {
  const card = createCard(cardData, cardHandlers);
  elements.cardsList.prepend(card);
}

function initializeCards(cardData) {
  cardData.forEach(renderCard);
}

function addDots(buttonElement) {
  buttonElement.textContent = `${buttonElement.textContent}...`;
}

function deleteDots(buttonElement) {
  buttonElement.textContent = `${buttonElement.textContent.replace(/\./g, "")}`;
}

// Работа с формами
function handleEditSubmit(evt) {
  evt.preventDefault();
  const submitButton = elements.editForm.querySelector(".button");
  addDots(submitButton);

  updateUserProfile(elements.nameInput.value, elements.jobInput.value)
    .then((updateData) => {
      elements.profileName.textContent = updateData.name;
      elements.profileDesc.textContent = updateData.about;
    })
    .finally(() => {
      deleteDots(submitButton);
      closeModal(elements.editModal);
    });
}

function handleAddSubmit(evt) {
  evt.preventDefault();
  const submitButton = elements.addForm.querySelector(".button");

  addDots(submitButton);

  addNewCard(elements.cardNameInput.value, elements.cardLinkInput.value)
    .then((cardData) => {
      renderCard(cardData);
    })
    .finally(() => {
      deleteDots(submitButton);
      closeModal(elements.addModal);
    });
}

function handleAvaEditSubmit(evt) {
  evt.preventDefault();
  const submitButton = elements.avatarForm.querySelector(".button");
  addDots(submitButton);

  updateAvatar(elements.avatarEditInput.value)
    .then(() => {
      elements.avatarIcon.style.backgroundImage = `url(${elements.avatarEditInput.value})`;
    })
    .finally(() => {
      deleteDots(submitButton);
      closeModal(elements.editAvatarModal);
    });
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
