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

export const AdicionarGestor = ({ showAddModal, gestores, setShowAddModal, setGestores, gestor, setGestor}) => {
  
    const [existingEmails, setExistingEmails] = useState([]);
    const [empresaList, setEmpresaList] = useState([]);


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
        .typeError("O ID deve ser um número")
        .required("Campo obrigatório")
        .positive("O ID deve ser um número positivo")
        .test("is-number", "O ID deve conter apenas números", (value) => {
          if (value) {
            const regex = /^[0-9]+$/;
            return regex.test(value.toString());
          }
          return true;
        }),
    });

    const onClose = () => {
      setGestor({})
      formik.resetForm()
      setShowAddModal(!showAddModal)
    }

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
          console.error("Erro ao obter os emails existentes", error);
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
        senha: values.senha
      };

      try {
        if(gestor.id) {
          const response = await api.put(`/gestor/${gestor.id}`, informationUpdate)
          setGestores((state) => state.map((gestorState) => gestorState.id === gestor.id ? response.data : gestorState))
          setShowAddModal(false);
          setGestor({})
        } else {
          const response = await api.post("/gestor", information)
          const data = response.data;
          setGestores([...gestores, data]);
          setShowAddModal(false);
          resetForm();
        }
        
      } catch (error) {
        console.log('Erro ao Adicionar Gestor', error);
      }
    };

    const formik = useFormik({
      initialValues: {
        nome: "",
        email: "",
        senha: "",
        empresa: {}
      },
      validateOnBlur: true,
      onSubmit,
      validationSchema: validationSchema,
    });

    useEffect(() => {
      if (gestor.id) {
        formik.setFieldValue("nome", gestor.nome)
        formik.setFieldValue("email", gestor.email)
        formik.setFieldValue("senha", gestor.senha)
        formik.setFieldValue("id", gestor.empresa.id)
      }
    }, [gestor])
   
    return (
          <Dialog open={showAddModal}>
            <div className="flex items-center justify-between">
              <DialogHeader>Gestor</DialogHeader>
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
                    disabled={gestor.id ? true : false}
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
                  {gestor.id ? "Atualizar" : "Adicionar"}
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