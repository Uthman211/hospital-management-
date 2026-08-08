import { Link, NavLink } from "react-router-dom";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/doctor", label: "Doctors" },
  { to: "/appointment", label: "Appointments" },
  { to: "/contact", label: "Contact" },
];

function Navbar() {
  return (
    <nav className="navbar hidden lg:flex">
      <div className="logo">Blue<span style={{ color: "#4A90E2" }}>Co</span></div>

      <div className="nav-links flex">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === "/"}
            className={({ isActive }) =>
              `px-3 py-2 rounded-2xl ${isActive ? "active" : ""}`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>


    </nav>
  );
}

export default Navbar;