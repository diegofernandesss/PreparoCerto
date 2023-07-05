import { useFormik } from 'formik';
import * as yup from "yup";

import { api } from '../../service/api'

import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useEffect } from 'react';

export const AdicionarUtensilio = ({ showAddModal, handleAddModal, utensilios, setShowAddModal, setUtensilios, utensilio, setUtensilio}) => {

const validationSchema = yup.object({
  nome: yup
    .string()
    .trim()
    .required("Campo obrigatório")
});

const onClose = () => {
  formik.resetForm()
  setShowAddModal(!showAddModal)
  setUtensilio({});
}

const onSubmit = async (values, { resetForm }) => {
  const information = {
    nome: values.nome
  };

  try {
    if(utensilio.id) {
      const response = await api.put(`/utensilio/${utensilio.id}`, information)
      setUtensilios((state) => state.map((utensilioState) => utensilioState.id === utensilio.id ? response.data : utensilioState))
      setUtensilio({});
      resetForm();
      setShowAddModal(false);
    } else {
      const response = await api.post("utensilios", information)
      const data = response.data;
      setUtensilios([...utensilios, data]);
      setShowAddModal(false);
      resetForm();
    }
   
  } catch (error) {
    console.error('Erro ao Adicionar/Atualizar Utensilios', error);
  }
  };

  const formik = useFormik({
    initialValues: {
      nome: "",
    },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });

  useEffect(() => {
    if (utensilio.id) {
      formik.setFieldValue("nome", utensilio.nome)
    }
  }, [utensilio])
  
  return (
        <Dialog open={showAddModal} onClose={onClose}>
          <div className="flex items-center justify-between">
            <DialogHeader>Utensilio</DialogHeader>
            <XMarkIcon className="mr-3 h-5 w-5" onClick={ () => onClose()} />
          </div>
          <form onSubmit={formik.handleSubmit}>
            <DialogBody divider>    
                <div className="grid gap-6">
                  <Input 
                    id="nome" 
                    name="nome"
                    color="orange" 
                    type="text"
                    label="Informe o Utensilio"
                    onChange={(e) => {formik.handleChange(e)}}
                    value={formik.values.nome}
                    onBlur={formik.handleBlur}
                    required
                    />
                  <span className="text-sm leading-6 text-red-600">
                    {formik.touched.nome && formik.errors.nome ? formik.errors.nome : ""}
                  </span>
                  </div>                
            </DialogBody>  
            <DialogFooter>
              <Button variant="outlined" color="red" onClick={ () => onClose()}>
                Fechar
              </Button>
              <Button className='mx-3' type="submit" variant="gradient" color="orange">
              {utensilio.id ? "Atualizar" : "Adicionar"}
              </Button>
            </DialogFooter>
          </form> 
        </Dialog>
  );
}