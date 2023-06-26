import { useFormik } from 'formik';
import * as yup from "yup";

import { api } from '../../service/api'

import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/solid";

export const AdicionarIngredientes = ({ showAddModal, handleAddModal, ingredientes, setShowAddModal, setIngredientes}) => {

    const onSubmit = async (values, { resetForm }) => {
      const information = {
        nome: values.nome
      };

      try {
        const response = await api.post("ingredientes", information)
        const data = response.data;
        setIngredientes([...ingredientes, data]);
        setShowAddModal(false);
        resetForm();
      } catch (error) {
        console.error('Erro ao Adicionar', error);
      }
    };

    const validationSchema = yup.object({
      nome: yup
        .string()
        .trim()
        .required("Campo obrigatório")
    });

    const formik = useFormik({
      initialValues: {
        nome: "",
      },
      validateOnBlur: true,
      onSubmit,
      validationSchema: validationSchema,
    });
   
    return (
          <Dialog open={showAddModal} onClose={handleAddModal}>
            <div className="flex items-center justify-between">
              <DialogHeader>Ingrediente</DialogHeader>
              <XMarkIcon className="mr-3 h-5 w-5" onClick={handleAddModal} />
            </div>
            <form onSubmit={formik.handleSubmit}>
              <DialogBody divider>
                
                  <div className="grid gap-6">
                    <Input 
                      id="nome" 
                      name="nome"
                      color="orange" 
                      type="text"
                      label="Digite o nome do Ingrediente"
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
                <Button variant="outlined" color="red" onClick={handleAddModal}>
                  Fechar
                </Button>
                <Button className='mx-3' type="submit" variant="gradient" color="orange">
                  Adicionar
                </Button>
              </DialogFooter>
            </form> 
          </Dialog>
    );
  }