import React from 'react';
import close_button from '../images/close_icon.svg';
import sucess_icon from '../images/sucess_icon.svg';
import fail_icon from '../images/fail_icon.svg';

export default function InfoTooltip(props) {
  return (
    <div
      className={`popup 
    ${props.isOpen ? 'popup_opened' : ''}`}
    >
      <div className="popup__background" />
      <div className="tooltip__container">
        <a className="popup__close" onClick={props.onClose}>
          <img src={close_button} alt="Simbolo de fechar janela." />
        </a>
        <img
          className="infotooltip__img"
          src={props.isSucceed ? sucess_icon : fail_icon}
        />
        <h2 className="infotooltip__title">
          {props.isSucceed
            ? 'Vitória! Você cadastrou um novo usuário.'
            : 'Ops, algo saiu deu errado!'}
        </h2>
      </div>
    </div>
  );
}
