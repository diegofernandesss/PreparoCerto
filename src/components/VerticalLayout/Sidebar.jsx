import React, { useContext } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  BookOpenIcon,
  UserGroupIcon,
  PowerIcon,
  BuildingOffice2Icon
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Outlet, useNavigate } from "react-router-dom";

import { AuthContext } from "../../Context/Auth";

export const SideBar = () => {
  const { signOut } = useContext(AuthContext)

  const navigate = useNavigate();
  const preparacao = () => navigate("preparacoes");
  const gestor = () => navigate("gestor");
  const preparadores = () => navigate("preparadores");
  const ingredientes = () => navigate("ingredientes");
  const cardapioPreparacao = () => navigate("cardapio-preparacao");
  const empresas = () => navigate("empresas");
  const utensilios = () => navigate("utensilios");
  const medidas = () => navigate("medidas");
  const modoPreparo = () => navigate("modosPreparo")

  const [open, setOpen] = React.useState(0);
 
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <>
    <div className="min-h-screen bg-gray-200">
    <div className="p-4 xl:ml-80">
    <aside className="fixed inset-0 z-50 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0">
    <Card className=" bg-gray-900 fixed top-4 left-4 h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl xl:translate-x-0 bg-gradient-to-br">
        <div className="mb-2 flex items-center gap-4 p-4">
        {/* <img  alt="logo" className="h-8 w-8" /> */}
          <Typography color="white" variant="h5" >
            Preparo Certo
          </Typography>
        </div>
      <List>
        <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              color="orange"
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 1}>
            <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
              <ListItemPrefix>
                <BookOpenIcon color="orange"  className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="white" className="mr-auto font-normal">
                Preparo
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem onClick={() => cardapioPreparacao()}>
                <ListItemPrefix>
                  <ChevronRightIcon color="orange" strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                <Typography color="white" className="mr-auto font-normal">
                Cardápio
              </Typography>
              </ListItem>
              <ListItem onClick={() => preparacao()}>
                <ListItemPrefix>
                  <ChevronRightIcon color="orange" strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                <Typography color="white" className="mr-auto font-normal">
                Preparações
              </Typography>
              </ListItem>
              <ListItem onClick={() => ingredientes()}>
                <ListItemPrefix>
                  <ChevronRightIcon color="orange" strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                <Typography color="white" className="mr-auto font-normal">
                Ingredientes
              </Typography>
              </ListItem>
              <ListItem onClick={() => utensilios()}>
                <ListItemPrefix>
                  <ChevronRightIcon color="orange" strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                <Typography color="white" className="mr-auto font-normal">
                Utensílios
              </Typography>
              </ListItem>
              <ListItem onClick={() => medidas()}>
                <ListItemPrefix>
                  <ChevronRightIcon color="orange" strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                <Typography color="white" className="mr-auto font-normal">
                Medida Caseira
              </Typography>
              </ListItem>
              {/* <ListItem onClick={() => modoPreparo()}>
                <ListItemPrefix>
                  <ChevronRightIcon color="orange" strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                <Typography color="white" className="mr-auto font-normal">
                Modo Prepato
              </Typography>
              </ListItem> */}
            </List>
          </AccordionBody>
        </Accordion>
        <Accordion
          open={open === 2}
          icon={
            <ChevronDownIcon
              color="orange"
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 2}>
            <AccordionHeader onClick={() => handleOpen(2)}  className="border-b-0 p-3">
              <ListItemPrefix>
                <UserGroupIcon color="orange" strokeWidth={3} className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="white" className="mr-auto font-normal">
                Equipe
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
            <ListItem onClick={() => gestor()}>
                <ListItemPrefix>
                  <ChevronRightIcon color="orange" strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                <Typography color="white" className="mr-auto font-normal">
                Gestores
              </Typography>
              </ListItem>
              <ListItem onClick={() => preparadores()}>
                <ListItemPrefix>
                  <ChevronRightIcon color="orange" strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                <Typography color="white" className="mr-auto font-normal">
                Preparadores
              </Typography>
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
        <Accordion
          open={open === 3}
        >
          <ListItem className="p-0" selected={open === 3}>
            <AccordionHeader onClick={() => empresas()} className="border-b-0 p-3">
              <ListItemPrefix>
                <BuildingOffice2Icon color="orange"  className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="white" className="mr-auto font-normal">
                Empresas
              </Typography>
            </AccordionHeader>
          </ListItem>
        </Accordion>
        <hr className="my-2 border-blue-gray-50" />
        
        <ListItem onClick={() => signOut()}>
          <ListItemPrefix>
            <PowerIcon color="orange" className="h-5 w-5" />
          </ListItemPrefix>
          <Typography color="white" className="mr-auto font-normal"  >
            Sair
          </Typography>
        </ListItem>
      </List>
    </Card>
    </aside>

      <div className=" justify-center ">
        <Outlet />
      </div>

      </div>
    </div>
</>
    
  );
}