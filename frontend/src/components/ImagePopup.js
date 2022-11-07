import close_button from "../images/close_icon.svg";

function ImagePopup(props) {
  return (
    <div
      className={`popup popup_view-image 
        ${props.card ? "popup_opened" : ""}`}
    >
      <div className="popup__background" />
      <div className="popup__container-view-image">
        <a className="popup__close popup__close_view-image">
          <img
            src={close_button}
            alt="Simbolo de fechar janela."
            onClick={props.onClose}
          />
        </a>
        <img className="popup__image" src={props.card.link} alt="Popup image" />
        <p className="popup__image-name">{props.card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
