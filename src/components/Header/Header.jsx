import logo from "../../images/Vector-header.png";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <header className="header">
        <img src={logo} alt="Around the US" className="header__logo" />
        <Link to="/signup" className="header__link">
          Regístrate
        </Link>
      </header>
    </>
  );
}

export default Header;
