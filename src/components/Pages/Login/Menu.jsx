import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "./firebaseconfig";

const Menu = () => {
  const historial = useHistory();
  const [usuario, setUsuario] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUsuario(user.email);
        console.log(user.email);
      }
    });
  }, []);

  const CerrarSesion = () => {
    auth.signOut();
    historial.push("/");
    setUsuario(null);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Inicio
            </Link>
          </li>
          <li>
            {!usuario ? (
              <Link className="nav-link" to="/login">
                Login
              </Link>
            ) : (
              <span></span>
            )}
          </li>
          <li>
            {!usuario ? (
              <Link className="nav-link" to="/admin">
                Admin
              </Link>
            ) : (
              <span></span>
            )}
          </li>
        </ul>
        {usuario ? (
          <button onClick={CerrarSesion} className="btn btn-danger">
            Cerrar Sesion
          </button>
        ) : (
          <span></span>
        )}
      </nav>
    </div>
  );
};

export default Menu;
