import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup(props) {
  const [title, setTitle] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleSubmit(e) {
    // Impeça que o navegador navegue até o endereço do formulário
    e.preventDefault();

    // Passe os valores dos componentes gerenciados para o manipulador externo
    props.onAddPlaceSubmit({
      title,
      link,
    });

    document.querySelector("#title").value = "";
    document.querySelector("#image-url").value = "";
  }

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm
      name="add-card"
      title="Novo Local"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="title"
        name="title"
        className="popup__form-input"
        placeholder="Titulo"
        required=""
        minLength={2}
        maxLength={30}
        onChange={handleTitleChange}
      />
      <span className="popup__form-error title-error" />
      <input
        type="url"
        id="image-url"
        name="image-url"
        className="popup__form-input"
        placeholder="Link da imagem"
        required=""
        onChange={handleLinkChange}
      />
      <span className="popup__form-error image-url-error" />
      <button className="popup__save-button popup__add-card-save-button">
        Salvar
      </button>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
