import { NavLink } from "react-router-dom"

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
    <section className="nav-bar">
      <nav className="navbar">
        <div className="logo">Blue<span style={{ color: "#4A90E2" }}>Co</span></div>

        <div className="nav-links">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={`px-3 py-2 rounded-2xl ({ isActive }) => (isActive ? "active" : "")`}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <button className="nav-btn text-[#4A90E2]">Book Now</button>
      </nav>
    </section>
  )
}

export default Navbar