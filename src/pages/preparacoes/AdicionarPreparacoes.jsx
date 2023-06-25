import { useState, useEffect } from "react";

import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";

import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
  
  
  const validationSchema = yup.object({
      nome: yup.string().min(3, "Por favor digite um nome válido").required("Campo obrigatório"),
      empresa: yup.number().required("Campo obrigatório"),
      numPorcoes: yup.number().required("Campo obrigatório")
  });
   
  export const AdicionarPreparacoes = ({ showAddModal, handleAddModal, preparacoes, setPreparacoes, setShowAddModal, editingId, setEditingId}) => {
    const [information, setInformation] = useState({
      id: "",
      nome: "",
      numPorcoes: "",
      empresa: ""
    });

    useEffect(() => {
      if (editingId) {
        const item = preparacoes.find((item) => item.id === editingId);
        if (item) {
          setInformation(item);
        }
      }
    }, [editingId, preparacoes]);

    const URL = "http://localhost:3000/preparacoes"

    const { nome, numPorcoes, empresa } = information
    const onInputChange = (e) => {
      setInformation({...information, [e.target.name]: e.target.value})
    } 
  
    const onSubmit = async (e) => {
      e.preventDefault();
      try {
        if (editingId) {
          const response = await axios.put(`${URL}/${editingId}`, information);
          const data = response.data;
          setPreparacoes((prevPreparacoes) => {
            const updatedPreparacoes = [...prevPreparacoes];
            const index = updatedPreparacoes.findIndex((item) => item.id === editingId);
            if (index !== -1) {
              updatedPreparacoes[index] = data;
            }
            return updatedPreparacoes;
          });
        } else {
          const response = await axios.post(URL, information);
          const data = response.data;
          setPreparacoes([...preparacoes, data]);
        }
        setShowAddModal(false);
        setEditingId(null);
      } catch (error) {
        console.error('Erro ao adicionar/editar preparação:', error);
      }
    };

    useEffect(() => {
      if (!showAddModal) {
        setInformation({
          id: "",
          nome: "",
          numPorcoes: "",
          empresa: ""
        });
      }
    }, [showAddModal]);
   
    return (
      <Formik
        initialValues={{
          nome: "",
          numPorcoes: "",
          empresa: ""
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values)
        }}
      >
        {(formik) => (
          <Dialog open={showAddModal} onClose={handleAddModal}>
            <div className="flex items-center justify-between">
              <DialogHeader>Preparação</DialogHeader>
              <XMarkIcon className="mr-3 h-5 w-5" onClick={handleAddModal} />
            </div>
            <DialogBody divider>
              <form onSubmit={(e) => onSubmit(e)}>
                <div className="grid gap-6">
                  <Input 
                    id="nome" 
                    name="nome"
                    color="orange" 
                    type="text"
                    label="Nome" 
                    value={nome}
                    onChange={(e) => onInputChange(e)}
                    />
                  <span className="text-sm leading-6 text-red-600">
                    {formik.touched.nome && formik.errors.nome ? formik.errors.nome : ""}
                  </span>
                  <Input
                    id="numPorcoes"
                    name="numPorcoes"
                    type="number"
                    color="orange"
                    label="Número de Porções"
                    value={numPorcoes}
                    onChange={(e) => onInputChange(e)}
                  />
                  <span className="text-sm leading-6 text-red-600">
                  {formik.touched.numPorcoes && formik.errors.numPorcoes ? formik.errors.numPorcoes : ""}
                  </span>
                  <Input
                    id="empresa"
                    name="empresa"
                    type="number"
                    color="orange"
                    label="ID da Empresa"
                    value={empresa}
                    onChange={(e) => onInputChange(e)}
                  />
                  <span className="text-sm leading-6 text-red-600">
                  {formik.touched.empresa && formik.errors.empresa ? formik.errors.empresa : ""}
                  </span>
                </div>
                <div>
                <Button type="submit" variant="gradient" color="orange">
              {editingId ? "Atualizar" : "Adicionar"}
            </Button>
                </div>
              </form>
            </DialogBody>  
            <DialogFooter>
              <Button variant="outlined" color="red" onClick={handleAddModal}>
              fechar
              </Button>
            </DialogFooter>    
          </Dialog>
        )}
      </Formik>
    );
  }