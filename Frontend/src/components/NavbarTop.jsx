import "../styles/components/NavbarTop.css";
import logo from "../assets/logo.png";

const NavbarTop = () => {
  return (
    <nav className="navbar-top">
      <div className="navbar-logo">
        <img src={logo} alt="SportSee logo" className="logo-img" />
      </div>
      <ul className="navbar-links">
        <li>Accueil</li>
        <li>Profil</li>
        <li>Réglage</li>
        <li>Communauté</li>
      </ul>
    </nav>
  );
};

export default NavbarTop;
