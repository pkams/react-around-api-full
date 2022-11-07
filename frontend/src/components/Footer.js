function Footer({ children }) {
  return (
    <footer className="footer">
      {children || <p className="footer__text">© 2021 Around The U.S.</p>}
    </footer>
  );
}

export default Footer;
