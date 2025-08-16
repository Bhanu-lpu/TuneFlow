import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHeart, FaHome, FaList, FaSearch, FaUser, FaBars, FaTimes } from "react-icons/fa";
import LanguageSwitch from "./LanguageSwitch";
import "./Navbar.css";

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinkClass = (path) =>
    `nav-link ${location.pathname === path ? "active" : ""}`;

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar">
      {/* Left: Logo + Hamburger */}
      <div className="navbar-left">
        <div className="navbar-logo">
          <img src="/banner.png" alt="TuneFlow Logo" className="logo-img" />
          <span className="logo-text">TuneFlow</span>
        </div>
        <div className="navbar-hamburger" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Navigation Links */}
      <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <Link to="/" className={navLinkClass("/")} onClick={() => setMenuOpen(false)}>
          <FaHome /> <span>Home</span>
        </Link>
        <Link to="/liked" className={navLinkClass("/liked")} onClick={() => setMenuOpen(false)}>
          <FaHeart /> <span>Liked</span>
        </Link>
        <Link to="/playlists" className={navLinkClass("/playlists")} onClick={() => setMenuOpen(false)}>
          <FaList /> <span>Playlists</span>
        </Link>
        <Link to="/search" className={navLinkClass("/search")} onClick={() => setMenuOpen(false)}>
          <FaSearch /> <span>Search</span>
        </Link>
      </div>

      {/* Right Side */}
      <div className="navbar-right">
        <LanguageSwitch />
        <div className="navbar-profile">
          <FaUser />
        </div>
      </div>
    </nav>
  );
}
