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
  ListarPreparacao,
  Login,
  Cadastro,
  Utensilios,
  LandingPage,
  MedidaCaseira,
  ModoDePreparo
} from '../pages';
import { SideBar } from "../components"
import { ErrorPage }  from "./ErrorPage";
import { PrivateRoute } from './privateRoutes'

export default function MainRouters() {
  return (
    <Routes>
      <Route path="*" element={<ErrorPage />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/painel-admin" element={<PrivateRoute><SideBar /></PrivateRoute>} >
        <Route path="preparacoes" element={<Preparacoes />} />
        <Route path="preparacoes/:id" element={<ListarPreparacao />}/>
        <Route path="gestor" element={<Gestor />} />
        <Route path="preparadores" element={<Preparadores />} />
        <Route path="ingredientes" element={<Ingredientes />} />
        <Route path="cardapio-preparacao" element={<PreparacoesCardapio />} />
        <Route path="empresas" element={<Empresas />} />
        <Route path="utensilios" element={<Utensilios />} />
        <Route path="medidas" element={<MedidaCaseira />} />
        <Route path="modosPreparo" element={<ModoDePreparo />} />
      </Route>
    </Routes>
  );
}
