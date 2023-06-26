import { useState, useEffect } from "react";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Card, CardHeader, Input, Typography, Button, CardBody, CardFooter } from "@material-tailwind/react";

import { AdicionarPreparacoes } from "./AdicionarPreparacoes";

import { api } from '../../service/api'

const TABLE_HEAD = ["ID", "Nome", "Número de Porções", "Data de Criação", "Empresa", ""]; 
 
export const Preparacoes = () => {
  const [showAddModal, setShowAddModal] = useState(false)

  const [preparacoes, setPreparacoes] = useState([])
  const [busca, setBusca] = useState("")
  const [deletingId, setDeletingId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const getPreparacoes = async () => {
    try {
      const response = await api.get("preparacoes");
      setPreparacoes(response.data);
    } catch (error) {
      console.error('Erro ao obter as preparações:', error);
    }
  };

  useEffect (() => {
    getPreparacoes();
  }, []);

  const handleAddModal = () => setShowAddModal(!showAddModal);
  const handleClickAdicionar = () => setShowAddModal(true);

  const handleDelete = async (id) => {
    try {
      await api.delete(`preparacao/${id}`);
      setPreparacoes((prevData) => prevData.filter((usuario) => usuario.id !== id));
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  const handleDeleteClick = (id) => {
    setShowDeleteModal(true);
    setDeletingId(id);
  };

  const handleCancelDelete = () => setShowDeleteModal(false);

  const handleConfirmDelete = () => {
    if (deletingId) {
      handleDelete(deletingId);
    }
  };
  
  return (
    <>
      <Card >
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
                              {item.empresa.nome}
                              </Typography>
                          </td>
                          <td>
                            <div className="flex w-max gap-4">
                                <Button 
                                size="sm" 
                                variant="outlined" 
                                onClick={(event) => handleAddModal(event, item.id)}
                                >
                                Editar
                                </Button>
                                <Button 
                                size="sm" 
                                color="red" 
                                onClick={() => handleDeleteClick(item.id)}
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
          preparacoes={preparacoes}
          setPreparacoes={setPreparacoes}
          setShowAddModal={setShowAddModal}
        />
      </Card>

      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>
          <div className="modal-container bg-white w-96 mx-auto rounded shadow-lg z-50">
            <div className="modal-content py-4 px-6">
              <h3 className="text-xl font-bold mb-2">Confirmar exclusão</h3>
              <p className="text-gray-700 mb-4">
                Você deseja realmente <span className="font-bold">EXCLUIR?</span>
              </p>
              <div className="modal-buttons flex justify-end">
                <button
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 hover:bg-gray-400"
                  onClick={handleCancelDelete}
                >
                  Cancelar
                </button>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  onClick={handleConfirmDelete}
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}