import {
    Routes, 
    Route
} from "react-router-dom";
import {
  AdicionarIngredientes,
  EditarIngredientes,
  Preparacao,
  AdicionarPreparacoes,
  EditarPreparacoes,
  Preparacoes
} from '../pages';
import { SideBar } from "../components"
import { ErrorPage }  from "./ErrorPage";

export default function MainRouters() {
  return (
    <Routes>
      
      <Route path="/preparacao" element={<Preparacao />} />
      <Route path="/adicionar-ingredientes" element={<AdicionarIngredientes />} />
      <Route path="/editar-ingredientes" element={<EditarIngredientes />} />
      
      <Route path="/adicionar-preparacoes" element={<AdicionarPreparacoes />} />
      <Route path="/editar-preparacoes" element={<EditarPreparacoes />} />
      <Route path="*" element={<ErrorPage />} />

      <Route path="/painel-admin/" element={<SideBar />}>
        <Route path="preparacoes" element={<Preparacoes />} />
      </Route>
    </Routes>
  );
}
