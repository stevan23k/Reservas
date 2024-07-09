import { useState } from "react";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";



const MySwal = withReactContent(Swal);

interface Reserva {
  id: number;
  nombre: string;
  fecha: string;
  hora: string;
  direccion: string;
  nmesa: string;
  nidentidad: string;
}

export const Reserva = () => {
  const navigate = useNavigate();
  const [nidentidad, setNidentidad] = useState("");
  const [data, setData] = useState<Reserva[]>([]);
  const [reservas, setResevas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DATA_URL}/api/reservas/nidentidad/${nidentidad}`
      );
      if (!response.ok) {
        throw new Error("Error al obtener la lista de reservas");
      }
      const data: Reserva[] = await response.json();
      setResevas(data);
    } catch (error: any) {
      setError(error.message);
    }
    setLoading(false);
  }

  const deleteReserva = async (id: number) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DATA_URL}/api/reservas/${id}`,
        {
          method: "DELETE",
        }
      );
      MySwal.fire({
        title: "Reserva cancelada",
        text: "Se ha cancelado su reserva",
        icon: "success",
        confirmButtonText: "Aceptar",
      }).then(() => {
        navigate("/");
      });
      if (!response.ok) {
        throw new Error("Error al eliminar la reserva");
      }
       setData((prevData: Reserva[]) =>
         prevData.filter((reserva) => reserva.id !== id)
      );
    } catch (error: any) {
       setError(error.message);
    }
  };

  return (
    <>
      <h1>Buscar Reserva por Número de Identidad</h1>
      <div className="d-flex justify-content-center mt-5">
        <form onSubmit={handleSearch}></form>
        <div>
          <input
            type="text"
            value={nidentidad}
            className="form-control mb-4"
            onChange={(e) => setNidentidad(e.target.value)}
            placeholder="Ingrese el número de identidad"
          />
          <button
            className="btn btn-primary mb-4"
            style={{ marginLeft: "73px" }}
            onClick={handleSearch}
            disabled={nidentidad.length === 0 || loading}
          >
            {loading ? "Buscando..." : "Buscar"}
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}

          {reservas.length > 0 && (
            <ul>
              {reservas.map((reserva) => (
                <div
                  key={reserva.id}
                  className="card"
                  style={{ width: "18rem", marginRight: "20px" }}
                >
                  <div className="card-body">
                    <h5 className="card-title">{reserva.nombre}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">
                      {reserva.fecha}
                    </h6>
                    <p className="card-text">
                      {reserva.hora} - {reserva.direccion} - {reserva.nmesa}
                    </p>
                    <button
                      className="btn btn-danger"
                      style={{ marginLeft: "80px" }}
                      onClick={() => deleteReserva(reserva.id)}
                    >
                      cancelar
                    </button>
                  </div>
                </div>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};
