import { openModal, closeModal } from "./components/modal.js";
import { createCard, removeCard, toggleLike } from "./components/card.js";
import initialCards from "./scripts/cards.js";
import "./pages/index.css";
import { enableValidation, clearValidation } from "./components/validation.js";

// DOM элементы
const elements = {
  editButton: document.querySelector(".profile__edit-button"),
  addButton: document.querySelector(".profile__add-button"),
  cardsList: document.querySelector(".places__list"),
  profileName: document.querySelector(".profile__title"),
  profileDesc: document.querySelector(".profile__description"),
  editModal: document.querySelector(".popup_type_edit"),
  addModal: document.querySelector(".popup_type_new-card"),
  imageModal: document.querySelector(".popup_type_image"),
  editForm: document.forms["edit-profile"],
  addForm: document.forms["new-place"],
  nameInput: document.querySelector(".popup__input_type_name"),
  jobInput: document.querySelector(".popup__input_type_description"),
  cardNameInput: document.querySelector(".popup__input_type_card-name"),
  cardLinkInput: document.querySelector(".popup__input_type_url"),
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

function initializeCards() {
  initialCards.forEach(renderCard);
}

// Работа с формами
function handleEditSubmit(evt) {
  evt.preventDefault();
  elements.profileName.textContent = elements.nameInput.value;
  elements.profileDesc.textContent = elements.jobInput.value;
  closeModal(elements.editModal);
}

function handleAddSubmit(evt) {
  evt.preventDefault();

  renderCard({
    name: elements.cardNameInput.value.trim(),
    link: elements.cardLinkInput.value.trim(),
  });

  closeModal(elements.addModal);
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

  // Обработчики форм
  elements.editForm.addEventListener("submit", handleEditSubmit);
  elements.addForm.addEventListener("submit", handleAddSubmit);

  // Закрытие попапов
  document.querySelectorAll(".popup__close").forEach((btn) => {
    btn.addEventListener("click", () => {
      closeModal(btn.closest(".popup"));
    });
  });
}

// Запуск приложения
function init() {
  setupEventListeners();
  initializeCards();
}

init();
