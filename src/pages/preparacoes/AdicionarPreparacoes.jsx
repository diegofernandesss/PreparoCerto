import { useFormik } from 'formik';
import * as yup from "yup";

import { api } from '../../service/api'

import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/solid";

export const AdicionarPreparacoes = ({ showAddModal, handleAddModal, preparacoes, setShowAddModal, setPreparacoes}) => {
  
    const onSubmit = async (values, { resetForm }) => {
      const information = {
        nome: values.nome,
        numPorcoes: parseInt(values.numPorcoes),
        empresa: {
          id: parseInt(values.id)
        }
      };

      try {
        const response = await api.post("preparacoes", information)
        const data = response.data;
        setPreparacoes([...preparacoes, data]);
        setShowAddModal(false);
        resetForm();
      } catch (error) {
        console.error('Erro ao Adicionar', error);
      }
    };

    const validationSchema = yup.object({
      nome: yup.string().min(3, "Por favor digite um nome válido").required("Campo obrigatório"),
      numPorcoes: yup.number().required("Campo obrigatório"),
      id: yup.number().required("Campo obrigatório"),
    });

    const formik = useFormik({
      initialValues: {
        nome: "",
        numPorcoes: "",
        id: ""
      },
      validateOnBlur: true,
      onSubmit,
      validationSchema: validationSchema,
    });
   
    return (
          <Dialog open={showAddModal} onClose={handleAddModal}>
            <div className="flex items-center justify-between">
              <DialogHeader>Preparação</DialogHeader>
              <XMarkIcon className="mr-3 h-5 w-5" onClick={handleAddModal} />
            </div>
            <DialogBody divider>
              <form onSubmit={formik.handleSubmit}>
                <div className="grid gap-6">
                  <Input 
                    id="nome" 
                    name="nome"
                    color="orange" 
                    type="text"
                    label="Nome da Preparação"
                    onChange={(e) => {formik.handleChange(e)}}
                    value={formik.values.nome}
                    onBlur={formik.handleBlur}
                    required
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
                    value={formik.values.numPorcoes}
                    onBlur={formik.handleBlur}
                    onChange={(e) => {formik.handleChange(e)}}
                    required
                  />
                  <span className="text-sm leading-6 text-red-600">
                  {formik.touched.numPorcoes && formik.errors.numPorcoes ? formik.errors.numPorcoes : ""}
                  </span>
                  <Input
                    id="id"
                    name="id"
                    type="number"
                    color="orange"
                    label="ID da Empresa"
                    value={formik.values.id}
                    onBlur={formik.handleBlur}
                    onChange={(e) => {formik.handleChange(e)}}   
                    required
                  />
                  <span className="text-sm leading-6 text-red-600">
                  {formik.touched.id && formik.errors.id ? formik.errors.id : ""}
                  </span>
                </div>
                <div>
                <Button className='mt-6' type="submit" variant="gradient" color="orange">
                  Adicionar
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


    );
  }