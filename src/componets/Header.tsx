import { NavLink } from "react-router-dom";
import logo from "../assets/aditri-logo.png"
const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-light text-light mb-4">
      <div className="container-fluid">
      <div>
          <img src={logo} alt="logo" style={{
            width:100,
            height:30
          }} />
        </div>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item mx-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "activee" : " inactivee"
              }
            >
             Resturants
            </NavLink>
          </li>
          <li className="nav-item mx-2">
            <NavLink
              to="/addResturant"
              className={({ isActive }) => (isActive ? "activee" : "inactivee")}
            >
              Add a New Resturant
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
