import { Route, Routes } from "react-router-dom";
import { Inicio } from "../components/Inicio";
import { Form } from "../components/Form";
import { Admin } from "../components/Admin";
import PrivateRoute from "../Funciones/PrivateRoute";
import { AuthProvider } from "../Funciones/AuthContext";
import { List } from "../components/List.tsx";
import { Reserva } from "../components/Reserva";
function Rutas() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Inicio />} />

        <Route path="/form" element={<Form />} />

        <Route path="/admin" element={<Admin />} />

        <Route
          path="/list"
          element={
            <PrivateRoute>
              <List/>
            </PrivateRoute>
          }
        />
        
        <Route path="/reservas" element={<Reserva />} />

        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </AuthProvider>
  );
}

export default Rutas;
