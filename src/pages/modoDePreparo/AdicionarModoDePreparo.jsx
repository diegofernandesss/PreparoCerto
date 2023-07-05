import { useFormik } from 'formik';
import * as yup from "yup";

import { api } from '../../service/api'

import { Button, 
         Dialog, 
         DialogHeader, 
         DialogBody, 
         DialogFooter, 
         Input,
         Select,
         Option
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AdicionarModoDePreparo = ({ showAddModal, modoPreparos, setShowAddModal, setModoPreparos, modoPreparo, setModoPreparo}) => {
  

    const [preparacaoList, setPreparacaoList] = useState([]);

    const notifyError = (error) => {
      toast.error(error.response.data.descricao);
    };

    const validationSchema = yup.object({
      text: yup
        .string()
        .trim()
        .required("Campo obrigatório")
        .matches(/^[A-Z].*$/, "O nome deve começar com uma letra maiúscula"),
      id: yup
        .number()
        .required("Campo Obrigatório")
    });

    const onClose = () => {
      setModoPreparo({})
      formik.resetForm()
      setShowAddModal(!showAddModal)
    }

    useEffect(() => {
      const fetchData = async () => {
        try {
          const modoPreparoResponse = await api.get("preparacoes");
          const modoPreparo = modoPreparoResponse.data;
          setPreparacaoList(modoPreparo);
        } catch (error) {
          console.error("Erro ao obter os emails existentes", error);
        }
      };
      fetchData();
    }, []);

    const handleSelectChange = (value) => {
      formik.setFieldValue('preparacao', value);
    };

    const onSubmit = async (values, { resetForm }) => {
      const information = {
        text: values.text,
        preparacao: {
            id: values.id
        }
      };

      try {
        if(modoPreparo.id) {
          const response = await api.put(`/modospreparo/${modoPreparo.id}`, information)
          setModoPreparos((state) => state.map((modoPreparoState) => modoPreparoState.id === modoPreparo.id ? response.data : modoPreparoState))
          setShowAddModal(false);
          setModoPreparo({})
        } else {
          const response = await api.post("/modospreparo", information)
          const data = response.data;
          setModoPreparos([...modoPreparos, data]);
          setShowAddModal(false);
          resetForm();
        }
        
      } catch (error) {
        notifyError(error)
      }
    };

    const formik = useFormik({
      initialValues: {
        text: "",
        preparacao: {}
      },
      validateOnBlur: true,
      onSubmit,
      validationSchema: validationSchema,
    });

    useEffect(() => {
      if (modoPreparo.id) {
        formik.setFieldValue("text", modoPreparo.text)
        formik.setFieldValue("preparacao", modoPreparo.preparacao.id)
      }
    }, [modoPreparo])
   
    return (
          <Dialog open={showAddModal}>
            <ToastContainer 
            position="top-center"
          />
            <div className="flex items-center justify-between">
              <DialogHeader>Modo Preparo</DialogHeader>
              <XMarkIcon className="mr-3 h-5 w-5" onClick={ () => onClose()} />
            </div>
            <DialogBody divider>
              <form onSubmit={formik.handleSubmit}>
                <div className="grid gap-6">
                  <Input 
                    id="text" 
                    name="text"
                    color="orange" 
                    type="text"
                    label="Digite a Descrição"
                    onChange={(e) => {formik.handleChange(e)}}
                    value={formik.values.text}
                    onBlur={formik.handleBlur}
                    required
                    />
                  <span className="text-sm leading-6 text-red-600">
                    {formik.touched.nome && formik.errors.nome ? formik.errors.nome : ""}
                  </span>
                  <Select label="Selecione uma Preparação" 
                    id="id"
                    value={formik.values.id} 
                    onChange={handleSelectChange}
                    onBlur={formik.handleBlur}
                    color="orange"
                    disabled={modoPreparo.id ? true : false}
                  >
                    {preparacaoList.map((modPrep) => (
                      <Option key={modPrep.id} value={modPrep.id}>
                        {modPrep.nome}
                      </Option>
                    ))}
                  </Select>
                  <span className="text-sm leading-6 text-red-600">
                  {formik.touched.preparacao && formik.errors.preparacao ? formik.errors.preparacao : ""}
                </span>
                </div>
                <div>
                <Button className='mt-6' type="submit" variant="gradient" color="orange">
                  {modoPreparo.id ? "Atualizar" : "Adicionar"}
                </Button>
                </div>
              </form>
            </DialogBody>  
            <DialogFooter>
              <Button variant="outlined" color="red" onClick={() => onClose()}>
              fechar
              </Button>
            </DialogFooter>    
          </Dialog>
    );
  }