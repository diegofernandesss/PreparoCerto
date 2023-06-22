import { Preparacoes } from "./pages/preparacoes/Preparacoes";
import { EditarPreparacoes } from "./pages/preparacoes/EditarPreparacoes"
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Preparacoes />} />
      <Route path="/editar/:id" element={<EditarPreparacoes />} />
    </Routes>
    
  );
}