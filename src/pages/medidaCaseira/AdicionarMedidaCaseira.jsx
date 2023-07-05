import { useFormik } from 'formik';
import * as yup from "yup";

import { api } from '../../service/api'

import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useEffect } from 'react';

export const AdicionarMedidaCaseira = ({ showAddModal, medidaCaseiras, setShowAddModal, setmedidaCaseiras, medidaCaseira, setMedidaCaseira}) => {

const validationSchema = yup.object({
  quantidade: yup
    .number()
    .required("Campo obrigatório"),
  descricao: yup
    .string()
    .trim()
    .required("Campo obrigatório"),
});

const onClose = () => {
  formik.resetForm()
  setShowAddModal(!showAddModal)
  setMedidaCaseira({});
}

const onSubmit = async (values, { resetForm }) => {
  const information = {
    quantidade: values.quantidade,
    descricao: values.descricao
  };

  
  try {
    if(medidaCaseira.id) {
      const response = await api.put(`medidas/${medidaCaseira.id}`, information);
      setmedidaCaseiras((state) => state.map((medidaCaseiraState) => medidaCaseiraState.id === medidaCaseira.id ? response.data : medidaCaseiraState))
      setMedidaCaseira({});
      resetForm();
      setShowAddModal(false);
    } else {
      const response = await api.post("medidas", information)
      const data = response.data;
      setmedidaCaseiras([...medidaCaseiras, data]);
      setShowAddModal(false);
      resetForm();
    }
   
  } catch (error) {
    console.error('Erro ao Adicionar/Atualizar Ingredientes', error);
  }
  };

  const formik = useFormik({
    initialValues: {
      quantidade: "",
      descricao: ""
    },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });

  useEffect(() => {
    if (medidaCaseira.id) {
      formik.setFieldValue("quantidade", medidaCaseira.quantidade)
      formik.setFieldValue("descricao", medidaCaseira.descricao)
    }
  }, [medidaCaseira])
  
  return (
        <Dialog open={showAddModal} onClose={onClose}>
          <div className="flex items-center justify-between">
            <DialogHeader>Medida Caseira</DialogHeader>
            <XMarkIcon className="mr-3 h-5 w-5" onClick={ () => onClose()} />
          </div>
          <form onSubmit={formik.handleSubmit}>
            <DialogBody divider>    
                <div className="grid gap-6">
                  <Input 
                    id="quantidade" 
                    name="quantidade"
                    color="orange" 
                    type="number"
                    label="Digite a Quantidade"
                    onChange={(e) => {formik.handleChange(e)}}
                    value={formik.values.quantidade}
                    onBlur={formik.handleBlur}
                    required
                    />
                  <span className="text-sm leading-6 text-red-600">
                    {formik.touched.quantidade && formik.errors.quantidade ? formik.errors.quantidade : ""}
                  </span>

                  <Input 
                    id="descricao" 
                    name="descricao"
                    color="orange" 
                    type="text"
                    label="Digite a Descrição"
                    onChange={(e) => {formik.handleChange(e)}}
                    value={formik.values.descricao}
                    onBlur={formik.handleBlur}
                    required
                    />
                  <span className="text-sm leading-6 text-red-600">
                    {formik.touched.descricao && formik.errors.descricao ? formik.errors.descricao : ""}
                  </span>
                  </div>                
            </DialogBody>  
            <DialogFooter>
              <Button variant="outlined" color="red" onClick={ () => onClose()}>
                Fechar
              </Button>
              <Button className='mx-3' type="submit" variant="gradient" color="orange">
              {medidaCaseira.id ? "Atualizar" : "Adicionar"}
              </Button>
            </DialogFooter>
          </form> 
        </Dialog>
  );
}