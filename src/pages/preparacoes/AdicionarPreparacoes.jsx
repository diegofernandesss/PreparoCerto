import { useFormik } from 'formik';
import * as yup from "yup";

import { api } from '../../service/api'

import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input, Select, Option } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from 'react';

export const AdicionarPreparacoes = ({ showAddModal, preparacoes, setShowAddModal, setPreparacoes, preparacao, setPreparacao}) => {
  
  const [empresaList, setEmpresaList] = useState([]);

  const validationSchema = yup.object({
    nome: yup
      .string()
      .min(3, "Por favor digite um nome válido")
      .required("Campo obrigatório"),
    numPorcoes: yup
      .number()
      .required("Campo obrigatório"),
    id: yup
      .number()
      .required("Campo obrigatório"),
  });

  const onClose = () => {
    setPreparacao({})
    formik.resetForm()
    setShowAddModal(!showAddModal)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const empresasResponse = await api.get("empresas");
        const empresas = empresasResponse.data.empresa;
        setEmpresaList(empresas);
      } catch (error) {
        console.error("Erro ao obter os emails existentes", error);
      }
    };
    fetchData();
  }, []);

  const handleSelectChange = (value) => {
    formik.setFieldValue('id', value)
  };

    const onSubmit = async (values, { resetForm }) => {
      const information = {
        nome: values.nome,
        numPorcoes: parseInt(values.numPorcoes),
        empresa: {
          id: parseInt(values.id)
        }
      };

      const informationUpdate = {
        nome: values.nome,
        numPorcoes: values.numPorcoes
      };

      try {
        if(preparacao.id) {
          const response = await api.put(`/preparacao/${preparacao.id}`, informationUpdate)
          setPreparacoes((state) => state.map((preparacaoState) => preparacaoState.id === preparacao.id ? response.data : preparacaoState))
          setShowAddModal(false);
          setPreparacao({})
        } else {
          const response = await api.post("preparacoes", information)
          const data = response.data;
          setPreparacoes([...preparacoes, data]);
          setShowAddModal(false);
          resetForm();
        }
        
      } catch (error) {
        console.error('Erro ao Adicionar/Atualizar Preparação', error);
      }
    };

    const formik = useFormik({
      initialValues: {
        nome: "",
        numPorcoes: "",
        empresa: {}
      },
      validateOnBlur: true,
      onSubmit,
      validationSchema: validationSchema,
    });

    useEffect(() => {
      if (preparacao.id) {
        formik.setFieldValue("nome", preparacao.nome)
        formik.setFieldValue("numPorcoes", preparacao.numPorcoes)
        formik.setFieldValue("id", preparacao.empresa.id)
      }
    }, [preparacao])
   
    return (
          <Dialog open={showAddModal}>
            <div className="flex items-center justify-between">
              <DialogHeader>Preparação</DialogHeader>
              <XMarkIcon className="mr-3 h-5 w-5"  onClick={ () => onClose()} />
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
                  <Select
                    id="id"
                    label="Selecione uma Empresa"
                    value={formik.values.id}
                    onChange={handleSelectChange}
                    onBlur={formik.handleBlur}
                    color="orange"
                    disabled={preparacao.id ? true : false}
                  >
                    {empresaList.map((empresa) => (
                      <Option key={empresa.id} value={empresa.id}>
                        {empresa.nome}
                      </Option>
                    ))}
                  </Select>
                  <span className="text-sm leading-6 text-red-600">
                  {formik.touched.id && formik.errors.id ? formik.errors.id : ""}
                </span>
                </div>
                <div>
                <Button className='mt-6' type="submit" variant="gradient" color="orange">
                  {preparacao.id ? "Atualizar" : "Adicionar"}
                </Button>
                </div>
              </form>
            </DialogBody>  
            <DialogFooter>
              <Button variant="outlined" color="red"  onClick={ () => onClose()}>
              fechar
              </Button>
            </DialogFooter>    
          </Dialog>
    );
  }