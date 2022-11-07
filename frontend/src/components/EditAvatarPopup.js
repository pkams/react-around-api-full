import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function EditProfilePopup(props) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
    avatarRef.current.value = "";
  }

  return (
    <PopupWithForm
      name="edit-avatar-photo"
      title="Alterar a foto de perfil"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        id="new-image-url"
        name="new-image-url"
        className="popup__form-input"
        placeholder="Link da nova imagem"
        required=""
        ref={avatarRef}
      />
      <span className="popup__form-error new-image-url-error" />
      <button className="popup__save-button popup__edit-photo-save-button">
        Salvar
      </button>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
