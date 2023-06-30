import {
    Routes, 
    Route
} from "react-router-dom";
import {
  Preparacoes,
  Gestor,
  Preparadores,
  Ingredientes,
  PreparacoesCardapio,
  Empresas,
  AdicionarPreparacao
} from '../pages';
import { SideBar } from "../components"
import { ErrorPage }  from "./ErrorPage";
import { Login } from  '../auth/Login'

export default function MainRouters() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<ErrorPage />} />
      <Route path="/painel-admin" element={<SideBar />}>
        <Route path="preparacoes" element={<Preparacoes />} />
        <Route path="preparacoes/:id" element={<AdicionarPreparacao />}/>
        <Route path="gestor" element={<Gestor />} />
        <Route path="preparadores" element={<Preparadores />} />
        <Route path="ingredientes" element={<Ingredientes />} />
        <Route path="cardapio-preparacao" element={<PreparacoesCardapio />} />
        <Route path="empresas" element={<Empresas />} />
      </Route>
    </Routes>
  );
}
