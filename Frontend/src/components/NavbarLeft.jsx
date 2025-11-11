import "../styles/components/NavbarLeft.css";
import IconCard from "./IconCard";
import yogaIcon from "../assets/icon-yoga.svg";
import swimIcon from "../assets/icon-swim.svg";
import bikeIcon from "../assets/icon-bike.svg";
import weightIcon from "../assets/icon-weight.svg";

const NavbarLeft = () => {
  return (
    <nav className="navbar-left">
      <ul className="navbar-icons">
        <li>
          <IconCard icon={yogaIcon} alt="Yoga" />
        </li>
        <li>
          <IconCard icon={swimIcon} alt="Natation" />
        </li>
        <li>
          <IconCard icon={bikeIcon} alt="Vélo" />
        </li>
        <li>
          <IconCard icon={weightIcon} alt="Musculation" />
        </li>
      </ul>
      <p className="navbar-copy">Copyright, SportSee 2020</p>
    </nav>
  );
};

export default NavbarLeft;
