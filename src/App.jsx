import { Preparacoes } from "./pages/preparacoes/Preparacoes";
import { EditarPreparacoes } from "./pages/preparacoes/EditarPreparacoes"
import { Cadastro } from "./register/Cadastro"
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Cadastro />} />
    </Routes>
    
  );
}