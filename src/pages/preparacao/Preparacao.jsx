import { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Card, CardHeader, Input, Typography, Button, CardBody, CardFooter } from "@material-tailwind/react";

import { AdicionarIngredientes } from "./AdicionarIngredientes";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const TABLE_HEAD = ["Ingredientes", "Peso Bruto", "Unidade", 
"Indicador de Parte Comestível", "Peso Líquido", "Per Capita", 
"Medida Caseira", "Embalagem", "Preço", "Custo de Preparo", ""];
 
export const Preparacao = () => {
  const navigate = useNavigate()
  const [showAddModal, setShowAddModal] = useState(false);

  const [preparacao, setPreparacao] = useState([])
  const [busca, setBusca] = useState("")

  const handleShow = () => setShowAddModal(!showAddModal);

  const handleClickAdicionar = (event) => {
    setShowAddModal(true);
  };

  const URL =  ""

  const getIngredientes = async () => {
    try {
      const response = await axios.get(URL);
      setPreparacao(response.data);
    } catch (error) {
      console.error('Erro ao obter as preparações:', error);
    }
  }

  useEffect(() => {
    getIngredientes()
  }, [])

  const deleteIngrediente = async (id) => {
    try {
      await axios.delete(`${URL}/${id}`);
      getIngredientes(); 
      console.log('Ingrediente excluído com sucesso');
    } catch (error) {
      console.error('Falha ao deletar ingrediente:', error);
    }
  }

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Preparação
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
            >
            Adicionar
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
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
            {preparacao.filter((item) => {
                return busca.toLowerCase() === "" ? item : item.toLowerCase().includes(busca)
                }).map((item) => (
                  <tr key={item.id} className="even:bg-blue-gray-50/50">
                    <td className="p-4">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {item.id}
                      </Typography>
                    </td>
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {item.ingredientes}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {item.pesoBruto}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {item.unidade}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {item.indicadorParteComestivel}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {item.pesoLiquido}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {item.perCapita}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {item.medidaCaseira}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {item.embalagem}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {item.preco}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {item.custoPreparacao}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography as="a" href="#" variant="small" color="blue" className="font-medium">
                    Edit
                  </Typography>
                </td>
                <div className="flex w-max gap-4">
                  <Button 
                  size="sm" 
                  variant="outlined" 
                  onClick={() => navigate(`/editar/${item.id}`)}
                  >
                  Editar
                  </Button>
                  <Button 
                  size="sm" 
                  color="red" 
                  onClick={() => deleteIngrediente(item.id)}
                  >
                  excluir
                  </Button>
                </div>
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
      <AdicionarIngredientes
        showAddModal={showAddModal}
        handleShow={handleShow}
      />
    </Card>
  );
}