import close_button from "../images/close_icon.svg";

function PopupWithForm(props) {
  return (
    <section
      className={`popup popup_${props.name} 
        ${props.isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__background" />
      <div className="popup__container">
        <a className="popup__close" onClick={props.onClose}>
          <img src={close_button} alt="Simbolo de fechar janela." />
        </a>
        <h2 className="popup__title">{props.title}</h2>
        <form className="popup__form" onSubmit={props.onSubmit}>
          {props.children}
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
