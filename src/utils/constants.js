// DOM элементы/
export const elements = {
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

export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
