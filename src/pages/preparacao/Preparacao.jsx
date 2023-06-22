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

import { PreparacaoModalAdd } from "./PreparacaoModalAdd";


const TABLE_HEAD = ["Ingredientes", "Peso Bruto", "Unidade", "Indicador de PArte Comestível", "Peso Líquido", "Per Capita", "Medida Caseira", "Embalagem", "Preço", "Custo de Preparo", ""];

const TABLE_ROWS = [
  {
    ingredientes: "Farinha",
    pesoBruto: 1,
    unidade: 1,
    indicadorParteComestivel: 1,
    pesoLiquido: 1,
    perCapita: 1,
    medidaCaseira: "2 Xícaras",
    embalagem: 1,
    preco: 2,
    custoPreparacao: 1,
}
];
 
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
              Preparação
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Veja e edite a preparação cadastrada no sistema
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
      <div className="relative overflow-x-auto">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map(({ingredientes, pesoBruto, unidade, indicadorParteComestivel, pesoLiquido, perCapita, medidaCaseira, embalagem, preco, custoPreparacao }, index) => (
              <tr key={index} className="even:bg-blue-gray-50/50">
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {ingredientes}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {pesoBruto}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {unidade}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {indicadorParteComestivel}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {pesoLiquido}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {perCapita}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {medidaCaseira}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {embalagem}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {preco}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {custoPreparacao}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography as="a" href="#" variant="small" color="blue" className="font-medium">
                    Edit
                  </Typography>
                </td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
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
      <PreparacaoModalAdd
        show={show}
        handleShow={handleShow}
      />
    </Card>
  );
}