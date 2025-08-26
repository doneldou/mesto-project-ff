const enableValidation = (config) => {
  const {
    formSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass,
  } = config;
  const formList = Array.from(document.querySelectorAll(`${formSelector}`));

  const setEventListeners = (formElement) => {
    const inputList = Array.from(
      formElement.querySelectorAll(`${inputSelector}`)
    );
    const buttonElement = formElement.querySelector(`${submitButtonSelector}`);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        isValid(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  };

  const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(`${inactiveButtonClass}`);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(`${inactiveButtonClass}`);
    }
  };

  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(`${inputErrorClass}`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(`${errorClass}`);
  };

  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(`${inputErrorClass}`);
    errorElement.textContent = "";
    errorElement.classList.remove(`${errorClass}`);
  };

  const isValid = (formElement, inputElement) => {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };

  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

const clearValidation = (formElement, config) => {
  const {
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass,
  } = config;

  const inputList = Array.from(formElement.querySelectorAll(inputSelector));

  const buttonElement = formElement.querySelector(submitButtonSelector);

  inputList.forEach((inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(inputErrorClass);

    if (errorElement) {
      errorElement.classList.remove(errorClass);
      errorElement.textContent = "";
    }

    inputElement.setCustomValidity("");
  });

  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.disabled = true;
};

export { enableValidation, clearValidation };
