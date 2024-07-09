import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const Form = () => {
  const [nombre, setNombre] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [local, setLocal] = useState("local 1");
  const [mesa, setMesa] = useState("mesa 1");
  const [numero, setNumero] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const enviarReserva = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const reserva = await axios.post(`${process.env.REACT_APP_DATA_URL}/reserva`, {
        nombre,
        fecha,
        hora,
        direccion: local,
        nmesa: mesa,
        nidentidad: numero,
      });
      console.log(`se ha enviado la reserva ${reserva.data}`);
      MySwal.fire({
        title: "Reserva creada",
        text: "Se ha creado la reserva",
        icon: "success",
        confirmButtonText: "Aceptar",
      }).then(() => {
        navigate("/");
      });
    } catch (error) {
      console.log(error);
      setError("Error al enviar la reserva");
      MySwal.fire({
        title: "Error",
        text: "Error al enviar la reserva",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="mb-3 row">
        <form onSubmit={enviarReserva}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Carlos..."
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <label htmlFor="floatingInput">Nombre</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="date"
              className="form-control"
              id="floatingInput"
              placeholder="fecha"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
            <label htmlFor="floatingInput">Fecha</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="time"
              className="form-control"
              id="floatingInput"
              placeholder="hora"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
            />
            <label htmlFor="floatingInput">Hora</label>
          </div>

          <div className="mb-3">
            <label htmlFor="inputState" className="form-label">Local</label>
            <select
              id="inputState"
              value={local}
              onChange={(e) => setLocal(e.target.value)}
              className="form-select"
            >
              <option value="local 1">Local 1</option>
              <option value="local 2">Local 2</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="inputState" className="form-label">Mesa</label>
            <select
              id="inputState"
              value={mesa}
              onChange={(e) => setMesa(e.target.value)}
              className="form-select"
            >
              <option value="mesa 1">Mesa 1</option>
              <option value="mesa 2">Mesa 2</option>
              <option value="mesa 3">Mesa 3</option>
              <option value="mesa 4">Mesa 4</option>
              <option value="mesa 5">Mesa 5</option>
              <option value="mesa 6">Mesa 6</option>


            </select>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Número de identidad"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
            />
            <label htmlFor="floatingInput">Número de identidad</label>
          </div>

          <div className="mb-3 d-flex justify-content-center">
            <button type="submit" className="btn btn-primary" disabled={nombre.length === 0 || fecha.length === 0 || hora.length === 0 || local.length === 0 || mesa.length === 0 || numero.length === 0}>
              Enviar reservación
            </button>
          </div>
          {error && (
            <p className="mt-2 d-flex justify-content-center text-danger">
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};