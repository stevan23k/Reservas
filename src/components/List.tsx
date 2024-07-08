import { useEffect, useState } from "react";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

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
export const List = () => {
  const [data, setData] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/reservas");
        if (!response.ok) {
          throw new Error("Error al obtener la lista de reservas");
        }
        const data: Reserva[] = await response.json();
        setData(data);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const deleteReserva = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/reservas/${id}`, {
        method: "DELETE",
      });
      MySwal.fire({
        title: "Reserva eliminada",
        text: "Se ha eliminado la reserva",
        icon: "success",
        confirmButtonText: "Aceptar",
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
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <h1>Lista de reservas</h1>
      <div className="pt-5 d-flex justify-content-center">
        <div className="col-md-8">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th style={{ width: "5%" }} className="text-center">
                  Codigo
                </th>
                <th style={{ width: "20%" }} className="text-center">
                  Nombre
                </th>
                <th style={{ width: "20%" }} className="text-center">
                  Fecha
                </th>
                <th style={{ width: "10%" }} className="text-center">
                  Hora
                </th>
                <th style={{ width: "10%" }} className="text-center">
                  Local
                </th>
                <th style={{ width: "15%" }} className="text-center">
                  Mesa
                </th>
                <th style={{ width: "20%" }} className="text-center">
                  numero de identidad
                </th>
                <th style={{ width: "5%" }} className="text-center">
                  Opciones
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((reserva) => (
                <tr className="align-middle" key={reserva.id}>
                  <td className="align-middle">{reserva.id}</td>
                  <td className="align-middle">{reserva.nombre}</td>
                  <td className="align-middle">{reserva.fecha}</td>
                  <td className="align-middle">{reserva.hora}</td>
                  <td className="align-middle">{reserva.direccion}</td>
                  <td className="align-middle">{reserva.nmesa}</td>
                  <td className="align-middle">{reserva.nidentidad}</td>
                  <td className="align-middle">
                    <button
                      onClick={() => deleteReserva(reserva.id)}
                      className="btn btn-danger"
                    >
                      eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
