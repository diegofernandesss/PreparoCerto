import { useState, useRef } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";

import { PreparacaoModal } from "./PreparacaoModal";
 
export const Preparacao = () => {
  const [show, setShow] = useState(false);
  const adicionarButton = useRef(null);

  const handleShow = () => setShow(!show);

  const handleClickAdicionar = (event) => {
    setShow(true);
    adicionarButton.current.blur();
  };

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Preparações
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Veja e edite as preparações cadastradas no sistema
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button variant="outlined" color="blue-gray" size="sm">
              ver tudo
            </Button>
            <Button 
              className="flex items-center gap-3" 
              color="orange" 
              size="sm"
              onClick={handleClickAdicionar}
              ref={adicionarButton}
            >
            Adicionar
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="w-full md:w-72">
            <Input color="orange" label="Buscar" icon={<MagnifyingGlassIcon className="h-5 w-5" />} />
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <p>TABELA FICA AQUI</p>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Página 1 de 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" color="blue-gray" size="sm">
            Anterior
          </Button>
          <Button variant="outlined" color="blue-gray" size="sm">
            Próxima
          </Button>
        </div>
      </CardFooter>
      <PreparacaoModal 
        show={show}
        handleShow={handleShow}
      />
    </Card>
  );
}