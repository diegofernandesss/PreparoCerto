import { useFormik } from 'formik';
import * as yup from "yup";

import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input, Select, Option } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from 'react';
import { api } from '../../service/api'

export const AdicionarPreparadores = ({ showAddModal, preparadores, setShowAddModal, setPreparadores, preparador, setPreparador}) => {

    const [existingEmails, setExistingEmails] = useState([]);
    const [empresaList, setEmpresaList] = useState([]);

    const onClose = () => {
      formik.resetForm()
      setShowAddModal(!showAddModal)
      setPreparador({});
    }

    const validationSchema = yup.object({
      nome: yup
        .string()
        .trim()
        .required("Campo obrigatório")
        .matches(/^[A-Z].*$/, "O nome deve começar com uma letra maiúscula"),
        email: yup
        .string()
        .trim()
        .email("Digite um e-mail válido")
        // .test("unique-email", "O e-mail já está em uso", function (value) {
        //   return !existingEmails.includes(value);
        // })
        .test("lowercase-email", "Digite o e-mail em letras minúsculas", function (value) {
          return /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/g.test(value);
        })
        .required("Campo obrigatório"),
      senha: yup
        .string()
        .trim()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          `Deve conter no mínimo 8 caracteres, uma letra maiúscula, uma 
          letra minúscula, um número e um caractere especial`
        )
        .required("Campo obrigatório"),
      id: yup
        .number()
        .required("Campo obrigatório")
    });

    useEffect(() => {
      const fetchData = async () => {
        try {
          const emailsResponse = await api.get("usuarios");
          const usuarios = emailsResponse.data;
          const emails = usuarios.map((usuario) => usuario.email);
          setExistingEmails(emails);
    
          const empresasResponse = await api.get("empresas");
          const empresas = empresasResponse.data.empresa;
          setEmpresaList(empresas);
        } catch (error) {
          console.error("Erro ao obter os dados", error);
        }
      };
      fetchData();
    }, []);

    const handleSelectChange = (value) => {
      formik.setFieldValue('id', value);
    };

    const onSubmit = async (values, { resetForm }) => {
      const information = {
        nome: values.nome,
        email: values.email,
        senha: values.senha,
        empresa: {
          id: parseInt(values.id)
        }
      };

      const informationUpdate = {
        nome: values.nome,
        email: values.email,
        senha: values.senha,
      };

      try {

        if(preparador.id){
          const response = await api.put(`/preparadores/${preparador.id}`, informationUpdate)
          setPreparadores((state) => state.map((preparadorState) => preparadorState.id === preparador.id ? response.data : preparadorState))
          setPreparador({});
          resetForm();
          setShowAddModal(false);
        } else {
          const response = await api.post("preparadores", information)
          const data = response.data;
          setPreparadores([...preparadores, data]);
          setShowAddModal(false);
          resetForm();
        }
        
      } catch (error) {
        console.error('Erro ao Adicionar', error);
      }
    };

    const formik = useFormik({
      initialValues: {
        nome: "",
        email: "",
        senha: "",
        emrpesa: {}
      },
      validateOnBlur: true,
      onSubmit,
      validationSchema: validationSchema,
    });

    useEffect(() => {
      if (preparador.id) {
        formik.setFieldValue("nome", preparador.nome)
        formik.setFieldValue("email", preparador.email)
        formik.setFieldValue("senha", preparador.senha)
        formik.setFieldValue("id", preparador.empresa.id)
      }
    }, [preparador])
   
    return (
          <Dialog open={showAddModal}>
            <div className="flex items-center justify-between">
              <DialogHeader>Preparadores</DialogHeader>
              <XMarkIcon className="mr-3 h-5 w-5" onClick={ () => onClose()} />
            </div>
            <DialogBody divider>
              <form onSubmit={formik.handleSubmit}>
                <div className="grid gap-6">
                  <Input 
                    id="nome" 
                    name="nome"
                    color="orange" 
                    type="text"
                    label="Digite seu Nome"
                    onChange={(e) => {formik.handleChange(e)}}
                    value={formik.values.nome}
                    onBlur={formik.handleBlur}
                    required
                    />
                  <span className="text-sm leading-6 text-red-600">
                    {formik.touched.nome && formik.errors.nome ? formik.errors.nome : ""}
                  </span>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    color="orange"
                    label="Digite seu email"
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                    onChange={(e) => {formik.handleChange(e)}}
                    required
                  />
                  <span className="text-sm leading-6 text-red-600">
                  {formik.touched.email && formik.errors.email ? formik.errors.email : ""}
                  </span>
                  <Input
                    id="senha"
                    name="senha"
                    type="password"
                    color="orange"
                    label="Digite sua senha"
                    value={formik.values.senha}
                    onBlur={formik.handleBlur}
                    onChange={(e) => {formik.handleChange(e)}}
                    required
                  />
                  <span className="text-sm leading-6 text-red-600">
                  {formik.touched.senha && formik.errors.senha ? formik.errors.senha : ""}
                  </span>
                  <Select label="Selecione uma Empresa" 
                    id="id"
                    value={formik.values.id} 
                    onChange={handleSelectChange}
                    onBlur={formik.handleBlur}
                    color="orange"
                    disabled={preparador.id ? true : false}
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
                  {preparador.id ? "Atualizar" : "Adicionar"}
                </Button>
                </div>
              </form>
            </DialogBody>  
            <DialogFooter>
              <Button variant="outlined" color="red" onClick={ () => onClose()}>
              fechar
              </Button>
            </DialogFooter>    
          </Dialog>
    );
  }