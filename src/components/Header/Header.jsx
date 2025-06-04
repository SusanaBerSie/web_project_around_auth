import logo from "../../images/Vector-header.png";

function Header() {
  return (
    <>
      <header className="header">
        <img src={logo} alt="Around the US" className="header__logo" />
      </header>
    </>
  );
}

export default Header;
