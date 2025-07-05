import { openModal, closeModal } from "./components/modal.js";
import { createCard, toggleLike } from "./components/card.js";
import initialCards from "./scripts/cards.js";

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
};

const cardHandlers = {
  handleDelete: (evt) => {
    evt.target.closest(".card").remove();
  },
  handleLike: (evt) => {
    toggleLike(evt.target);
  },
  handleImageClick: (cardData) => {
    const { imageModal } = elements;
    imageModal.querySelector(".popup__image").src = cardData.link;
    imageModal.querySelector(".popup__caption").textContent = cardData.name;
    openModal(imageModal);
  },
};

function renderCard(cardData) {
  const card = createCard(cardData, {
    handleDelete: cardHandlers.handleDelete,
    handleLike: cardHandlers.handleLike,
    handleImageClick: () => cardHandlers.handleImageClick(cardData),
  });
  elements.cardsList.prepend(card);
}

function initializeCards() {
  initialCards.forEach(renderCard);
}

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

  elements.addForm.reset();
  closeModal(elements.addModal);
}

function setupEventListeners() {
  elements.editButton.addEventListener("click", () => {
    elements.nameInput.value = elements.profileName.textContent;
    elements.jobInput.value = elements.profileDesc.textContent;
    openModal(elements.editModal);
  });

  elements.addButton.addEventListener("click", () => {
    elements.addForm.reset();
    openModal(elements.addModal);
  });

  elements.editForm.addEventListener("submit", handleEditSubmit);
  elements.addForm.addEventListener("submit", handleAddSubmit);

  document.querySelectorAll(".popup__close").forEach((btn) => {
    btn.addEventListener("click", () => {
      closeModal(btn.closest(".popup"));
    });
  });
}

function init() {
  setupEventListeners();
  initializeCards();
}

init();
