import React from "react";
import { useNavigate } from "react-router-dom";
import "../style/header.css";

function Header() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  }

  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container d-flex justify-content-between">
        <a className="navbar-brand navi" href="/">
          Employee Management System
        </a>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Header;