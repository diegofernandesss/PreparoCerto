import { useState, useEffect } from "react";
import { api } from '../../service/api'

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Card, 
         CardHeader, 
         Input, 
         Typography, 
         Button, 
         CardBody, 
         CardFooter 
} from "@material-tailwind/react";

const TABLE_HEAD = [
        "ID", 
        "Empresa", 
        "Proprietário", 
        "Preparação", 
        "Criação da Preparação"
]; 

export const PreparacoesCardapio = () => {
  const [preparacaoesCardapio, setPreparacoesCardapio] = useState([])
  const [busca, setBusca] = useState("")

  const getPreparacoesCardapio  = async () => {
    try {
      const response = await api.get("cardapio_preparacao");
      setPreparacoesCardapio(response.data);
    } catch (error) {
      console.error('Erro ao obter as preparações:', error);
    }
  };

  useEffect (() => {
    getPreparacoesCardapio ();
  }, []);
  
  return (
    <>
      <Card >
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography className="mt-2" variant="h5" color="blue-gray">
                Preparações do Cardápio
              </Typography>
            </div>
          </div>
          <div className="flex flex-col items-center mt-9 justify-between gap-4 md:flex-row">
            <div className="w-full md:w-72">
              <Input 
                  color="orange" 
                  label="Buscar" 
                  icon={<MagnifyingGlassIcon 
                  className="h-5 w-5" />} 
                  onChange={(e) => setBusca(e.target.value)}
                />
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
                        <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                            {head}
                        </Typography>
                    </th>
                  ))}
                  </tr>
              </thead>
              <tbody>
              {preparacaoesCardapio.filter((item) => {
                      return busca.toLowerCase() === "" ? item : item.nome.toLowerCase().includes(busca);
                    }).map((item) => (
                      <tr key={item.id} className="even:bg-blue-gray-50/50">
                            <td className="p-4">
                            <Typography variant="small" color="blue-gray" className="font-normal">
                              {item.id}
                            </Typography>
                          </td>
                          <td className="p-4">
                              <Typography variant="small" color="blue-gray" className="font-normal">
                              {item.cardapio.empresa.nome}
                              </Typography>
                          </td>
                          <td className="p-4">
                              <Typography variant="small" color="blue-gray" className="font-normal">
                              {item.cardapio.empresa.proprietario.nome}
                              </Typography>
                          </td>
                          <td className="p-4">
                              <Typography variant="small" color="blue-gray" className="font-normal">
                              {item.preparacao.nome}
                              </Typography>
                          </td>
                          <td className="p-4">
                              <Typography variant="small" color="blue-gray" className="font-normal">
                              {item.preparacao.criacao}
                              </Typography>
                          </td>
                          <td>
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
      </Card>

    </>
  );
}