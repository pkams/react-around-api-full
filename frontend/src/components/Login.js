import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import logo from '../images/logo.svg';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import InfoTooltip from './InfoTooltip';
import * as auth from '../auth.js';

export default function Login(props) {
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const [isSucceed, setIsSucceed] = React.useState(true);
  const [info, setInfo] = React.useState({ email: '', password: '' });

  const history = useHistory();

  function closePopup() {
    setIsPopupOpen(false);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    let new_info = { ...info };
    new_info[name] = value;
    setInfo(new_info);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onLogin(info, setIsSucceed, setIsPopupOpen);
  }

  return (
    <>
      <div className="main-page">
        <Header>
          <p className="header__note header__info">Entrar</p>
        </Header>

        <Main>
          <div className="">
            <h2 className="register__title">Entrar</h2>
            <form className="register__form" onSubmit={handleSubmit}>
              <input
                type="email"
                id="email"
                name="email"
                className="register__form-input"
                placeholder="Email"
                required=""
                onChange={handleChange}
              />
              <span className="register__form-error name-error" />
              <input
                type="password"
                id="password"
                name="password"
                className="register__form-input"
                placeholder="Password"
                required=""
                onChange={handleChange}
              />
              <span className="register__form-error job-error" />
              <button className="register__save-button">Entrar</button>
              <NavLink
                exact
                className="register__save-button-text"
                to="/signup"
              >
                Ainda não é membro? Inscreva-se aqui!
              </NavLink>
            </form>
          </div>
        </Main>

        <InfoTooltip
          isOpen={isPopupOpen}
          isSucceed={isSucceed}
          onClose={closePopup}
        />
      </div>
    </>
  );
}
