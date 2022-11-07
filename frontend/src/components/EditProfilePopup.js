import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditProfilePopup(props) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Impeça que o navegador navegue até o endereço do formulário
    e.preventDefault();

    // Passe os valores dos componentes gerenciados para o manipulador externo
    props.onUpdateUser({
      name,
      about: description,
    });

    document.querySelector("#name").value = "";
    document.querySelector("#job").value = "";
  }

  // Assinatura do contexto
  const currentUser = React.useContext(CurrentUserContext);

  // Após carregar o usuário atual da API
  // seus dados serão usados em componentes gerenciados.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      title="Edit profile"
      name="edit"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="name"
        name="name"
        className="popup__form-input"
        placeholder="Nome"
        required=""
        minLength={2}
        maxLength={20}
        onChange={handleNameChange}
      />
      <span className="popup__form-error name-error" />
      <input
        type="text"
        id="job"
        name="job"
        className="popup__form-input"
        placeholder="Sobre mim"
        required=""
        minLength={2}
        maxLength={200}
        onChange={handleDescriptionChange}
      />
      <span className="popup__form-error job-error" />
      <button className="popup__save-button">Salvar</button>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
