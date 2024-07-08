
import { NavLink } from "react-router-dom";

export const Cabecera = () => {
  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <NavLink to={"/"} className="navbar-brand">Navbar</NavLink>
          <div className="d-flex justify-content-end">
           <h5><NavLink to="/list"style={{color: "black", textDecoration: "none", fontWeight:"bold"}}> ADMINISTRAR </NavLink></h5>
          </div>
        </div>
      </nav>
    </>
  );
};