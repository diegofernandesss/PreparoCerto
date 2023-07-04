import React from "react";
import { useFormik } from 'formik';
import * as yup from "yup";
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api } from '../../service/api';
import { useNavigate } from "react-router-dom";
import { Header } from '../../components/LandingPage/Header/Header'

export function Cadastro() {

  const navigate = useNavigate();

  const notifyError = (error) => {
    toast.error(error.response.data.descricao);
  };

  const notifySuccess = () => {
    toast.success("Cadastrado com Sucesso");
  };


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
        .test("lowercase-email", "Digite um e-mail válido", function (value) {
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
  });

  const onSubmit = async (values) => {
    const information = {
      nome: values.nome,
      email: values.email,
      senha: values.senha
    };

    try {
      await api.post(`proprietarios`, information);
      notifySuccess()
    } catch (error) {
      notifyError(error);
    }
  };
  
  const formik = useFormik({
    initialValues: {
      nome: "",
      email: "",
      senha: "",
    },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });


  return (
    <>
    <Header />
    <ToastContainer 
      position="top-center"
    />
      <div className="flex justify-center items-center h-screen">
        <Card color="transparent" shadow={false}>
          <div className="flex justify-center items-center">
            <Typography variant="h4" color="blue-gray">
              Cadastro
            </Typography>
          </div>

          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={formik.handleSubmit}>
            <div className="mb-4 flex flex-col gap-3">
            <Input
                id="nome"
                size="lg"
                label="Nome"
                color="orange"
                onChange={formik.handleChange}
                value={formik.values.nome}
                onBlur={formik.handleBlur}
                required
                className="input-margin"
              />
              <span className="text-sm text-red-600">
                {formik.touched.nome && formik.errors.nome ? formik.errors.nome : ""}
              </span>
              <Input
                id="email"
                size="lg"
                label="E-mail"
                color="orange"
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
                required
                className="input-margin"
              />
              <span className="text-sm text-red-600">
                {formik.touched.email && formik.errors.email ? formik.errors.email : ""}
              </span>
              <Input
                id="senha"
                size="lg"
                label="Senha"
                type="password"
                color="orange"
                onChange={formik.handleChange}
                value={formik.values.senha}
                onBlur={formik.handleBlur}
                required
                className="input-margin"
              />
              <span className="text-sm  text-red-600">
                  {formik.touched.senha && formik.errors.senha ? formik.errors.senha : ""}
              </span>
            </div>
            <Button color="orange" className="mt-6" fullWidth type="submit">
              Cadastrar
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
          Você já possui cadastro?{" "}
          <a
            href="#"
            onClick={() => navigate("/login")}
            className="font-medium text-orange-400 transition-colors hover:text-orange-500"
          >
            Entrar
          </a>
        </Typography>
          </form>
        </Card>
      </div>

      <div>
        
      </div>
    </>
  );
}