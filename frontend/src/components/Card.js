import React from 'react';
import trash_icon from '../images/trash_icon.svg';
import like_icon from '../images/like_icon.svg';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card(props) {
  function handleClick() {
    props.onCardClick({ link: props.link, name: props.name });
  }

  function handleLikeClick() {
    props.onCardLike(props);
  }

  function handleDeleteClick() {
    props.onCardDelete(props);
  }

  // Pegando contexto do usuário
  const currentUser = React.useContext(CurrentUserContext);

  // Verificando se o usuário atual é o dono do cartão atual
  const isOwn = props.owner === currentUser._id;

  // Criando uma variável que você definirá em `className` para o botão delete
  const cardDeleteButtonClassName = `card__trash-button ${
    isOwn ? '' : 'card__trash-button_hidden'
  }`;

  // Verifique se o cartão foi curtido pelo usuário atual
  const isLiked = props.likes.some((i) => i === currentUser._id);

  // Criw uma variável que possa ser definida em `className` para o botão de curtir
  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? 'card__like-button_clicked' : ''
  }`;

  return (
    <div className="card">
      <img
        className="card__image"
        src={props.link}
        alt="Imagem do cartão baseada no link inserido pelo usuário."
        onClick={handleClick}
      />
      <div className="card__bottom">
        <p className="card__text-title">{props.name}</p>
        <div className="card__like-section">
          <img
            className={cardLikeButtonClassName}
            src={like_icon}
            alt="Um coração que representa o simbolo de like"
            onClick={handleLikeClick}
          />
          <p className="card__like-count">{props.likes.length}</p>
        </div>
      </div>
      <img
        className={cardDeleteButtonClassName}
        src={trash_icon}
        onClick={handleDeleteClick}
      />
    </div>
  );
}

export default Card;
