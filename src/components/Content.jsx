import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

const Content = () => {
  const [token, setToken] = useState("");

  const logout = () => {
    localStorage.clear();
  };

  useEffect(() => {
    setToken(localStorage.getItem("ApiKey"));
  }, [token]);

  return (
    <div>
      <nav className="navbar py-3 navbar-expand-lg">
        <div className="col-11 mx-auto d-flex justify-content-between">
          <ul className="nav col-3">
            <li className="nav-item">
              <Link
                to="/dashboard"
                className="nav-link active"
                aria-current="page"
                href="#"
              >
                Home
              </Link>
            </li>
          </ul>

          <div className="col-1 col-sm-3 d-flex justify-content-center">
            <img src="/public/logo.png" alt="Logo de un bebé envuelto en una" />
          </div>
          
          <ul className="nav col-7 col-sm-3 d-flex justify-content-end"
          >
            {!token && (
              <>
                <li className="nav-item login">
                  <Link to="/" className="nav-link">
                    Log in
                  </Link>
                </li>
                <li className="nav-item signin">
                  <Link to="/signin" className="nav-link">
                    Sign in
                  </Link>
                </li>
              </>
            )}
            {token && (
              <li className="nav-item logout">
                <Link to="/" className="nav-link" onClick={logout}>
                  Log out
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>

      <div className="presentation d-flex justify-content-center align-items-center">
        <h1 className="text-center">BABY TRACKER</h1>
      </div>

      <div className="content">
        <Outlet />
      </div>

      <footer>
        <p>Taller de Desarrollo Front End - Universidad ORT</p>
        <p>Lucas Giusiano - 2024</p>
      </footer>
    </div>
  );
};

export default Content;
