import React from 'react';
import profileImageEditButton from '../images/edit_profile_picture.svg';
import profileEditButton from '../images/edit_button.svg';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main({ children, ...props }) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      {children || (
        <>
          <section className="profile">
            <div className="profile__avatar">
              <img
                className="profile__avatar-edit-button"
                src={profileImageEditButton}
                alt="Icone de edição da foto."
                onClick={props.onEditAvatarClick}
              />
              <img
                className="profile__avatar-img"
                src={currentUser.avatar}
                alt="Foto de avatar de Jacques Cousteau"
              />
            </div>
            <div className="profile__info">
              <div className="profile__top-content">
                <h1 className="profile__name">{currentUser.name}</h1>
                <img
                  className="profile__edit-button"
                  src={profileEditButton}
                  alt="Simbolo de edição"
                  onClick={props.onEditProfileClick}
                />
              </div>
              <p className="profile__job">{currentUser.about}</p>
            </div>
            <button
              className="profile__add-button"
              onClick={props.onAddPlaceClick}
            >
              +
            </button>
          </section>
          <div className="elements">
            {props.cards.slice(0, 6).map((element, id) => {
              return (
                <CurrentUserContext.Provider value={currentUser} key={id}>
                  <Card
                    name={element.name}
                    link={element.link}
                    likes={element.likes}
                    owner={element.owner}
                    _id={element._id}
                    onCardLike={props.onCardLike}
                    onCardDelete={props.onCardDelete}
                    onCardClick={props.onCardClick}
                  />
                </CurrentUserContext.Provider>
              );
            })}
          </div>
        </>
      )}
    </main>
  );
}

export default Main;
