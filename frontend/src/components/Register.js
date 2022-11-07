import React from 'react';
import Header from './Header';
import Main from './Main';
import { NavLink, useHistory } from 'react-router-dom';
import logo from '../images/logo.svg';
import Footer from './Footer';
import InfoTooltip from './InfoTooltip';
import * as auth from '../auth.js';

export default function Register(props) {
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
    props.onRegister(info, setIsSucceed, setIsPopupOpen);
    e.target.reset();
  }

  return (
    <>
      <div className="main-page">
        <Header>
          <p className="header__note header__info">Faça o login</p>
        </Header>

        <Main>
          <div className="">
            <h2 className="register__title">Inscrever-se</h2>
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
              <button className="register__save-button">Inscrever-se</button>
              <NavLink
                exact
                className="register__save-button-text"
                to="/signin"
              >
                Já é um membro? Faça o login aqui!
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
