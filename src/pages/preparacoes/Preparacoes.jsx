import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Card, CardHeader, Input, Typography, Button, CardBody, CardFooter } from "@material-tailwind/react";

import { AdicionarPreparacoes } from "./AdicionarPreparacoes";

const TABLE_HEAD = ["ID", "Nome", "Número de Porções", "Data de Criação", "ID da Empresa", "", ""]; 

 
export const Preparacoes = () => {
  const navigate = useNavigate()
  const [showAddModal, setShowAddModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [preparacoes, setPreparacoes] = useState([])
  const [busca, setBusca] = useState("")

  const handleAddModal = () => setShowAddModal(!showAddModal)
  const handleClickAdicionar = (event) => {
    setShowAddModal(true);
  };

  const handleDeleteModal = () => setShowDeleteModal(!showDeleteModal)
  const handleClickExcluir = () => {
    setShowDeleteModal(true)
  }

  const URL = "http://localhost:3000/preparacoes";

  const getPreparacoes = async () => {
    try {
      const response = await axios.get(URL);
      setPreparacoes(response.data);
    } catch (error) {
      console.error('Erro ao obter as preparações:', error);
    }
  };

  useEffect (() => {
    getPreparacoes();

  }, []);


  const deletePreparacoes = async (id) => {
    try {
      await axios.delete(`${URL}/${id}`);
      getPreparacoes(); 
      console.log('Preparação excluída com sucesso');
    } catch (error) {
      console.error('Falha ao deletar preparação:', error);
    }
  }
  
  return (
    <>
      <Card>
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Preparações
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button 
                className="flex items-center gap-3" 
                color="orange" 
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
                  {preparacoes.filter((item) => {
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
                              {item.nome}
                              </Typography>
                          </td>
                          <td className="p-4">
                              <Typography variant="small" color="blue-gray" className="font-normal">
                              {item.numPorcoes}
                              </Typography>
                          </td>
                          <td className="p-4">
                              <Typography variant="small" color="blue-gray" className="font-normal">
                              {item.criacao}
                              </Typography>
                          </td>
                          <td className="p-4">
                              <Typography variant="small" color="blue-gray" className="font-normal">
                              {item.empresa}
                              </Typography>
                          </td>
                          <td>
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
                                onClick={() => deletePreparacoes(item.id)}
                                >
                                excluir
                                </Button>
                            </div>
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
        <AdicionarPreparacoes 
          showAddModal={showAddModal}
          handleAddModal={handleAddModal}
        />
      </Card>
    </>
  );
}