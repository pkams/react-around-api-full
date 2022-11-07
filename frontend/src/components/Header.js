import logo from '../images/logo.svg';

function Header({ children }) {
  return (
    <header className="header">
      <img
        className="header__logo"
        src={logo}
        alt="Logo do site Around the U.S."
      />
      {children}
    </header>
  );
}

export default Header;
