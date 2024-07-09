import { useNavigate } from "react-router-dom";


export const Inicio = () => {

  const navigate = useNavigate();
  const irForm = () => {
    navigate("/form");
  };
  const irReservas = () => {
    navigate("/reservas");
  };
  
  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="col-md-6 ">
          <h1> bienvenido a nuestra aplicacion de reservas </h1>
          <h2 className="mt-4 d-flex justify-content-lg-center">
            {" "}
            que quieres hacer?{" "}
          </h2>
          <div className="d-flex justify-content-lg-center row">
            <button className="btn btn-primary mb-4 mt-5" onClick={irForm}>
              Hacer una reserva
            </button>
            <button className="btn btn-primary" onClick={irReservas}>
              tengo reservas
            </button>
          </div>
        </div>
      </div>
    </>
  );
};