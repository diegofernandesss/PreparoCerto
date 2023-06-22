import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Typography } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
 
export const ExcluirPreparacoes = ({ showDeleteModal, setShowDeleteModal, handleDeleteModal }) => {
  const [preparacoes, setPreparacoes] = useState([])
  const [deletingId, setDeletingId] = useState('')

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
      setPreparacoes((prevData) => prevData.filter((preparacoes) => preparacoes.id !== id));
      setShowDeleteModal(false)
      getPreparacoes(); 
      console.log('Preparação excluída com sucesso');
    } catch (error) {
      console.error('Falha ao deletar preparação:', error);
    }
  };

  const handleCancelDelete = () => setShowDeleteModal(false);

  const handleConfirmDelete = () => {
    if (deletingId) {
      deletePreparacoes(deletingId);
    }
  };

  return (
    <>
      <Dialog open={showDeleteModal} onClose={handleDeleteModal}>
        <div className="flex items-center justify-between">
          <DialogHeader>Excluir Permanentemente</DialogHeader>
          <XMarkIcon className="mr-3 h-5 w-5" onClick={handleDeleteModal} />
        </div>
        <DialogBody divider className="grid place-items-center gap-4">
          <Typography color="red" variant="h4">
            Atenção!
          </Typography>
          <Typography className="text-center font-normal">
            Tem certeza que deseja excluir?
          </Typography>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="blue-gray" onClick={handleCancelDelete}>
            cancelar
          </Button>
          <Button color="red" variant="gradient" onClick={handleConfirmDelete}>
            excluir
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}