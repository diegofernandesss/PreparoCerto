import React, { useContext, useEffect } from "react";
import { useFormik } from 'formik';
import * as yup from "yup";
import {
  Card,
  Input,
  Button,
  Typography,
  Navbar,
} from "@material-tailwind/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/Auth";
import { Header } from '../../components/LandingPage/Header/Header'

export function Login() {

  const navigate = useNavigate();

  const { signIn, signed } = useContext(AuthContext)

  const notifyError = (error) => {
    toast.error(error.response.data.descricao);
  };
  
  const validationSchema = yup.object({
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
      email: values.email,
      senha: values.senha
    };

    try {
      await signIn(information)
    } catch(error) {
      notifyError(error)
    }
    
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      senha: "",
    },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });


  useEffect(() => {
    if (signed) {
      navigate("/painel-admin");
    }
  }, [signed, navigate]);

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
              Login
            </Typography>
          </div>

          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={formik.handleSubmit}>
            <div className="mb-4 flex flex-col gap-3">
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
              Entrar
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
          Você ainda não possui Cadastro?{" "}
          <a
            href="#"
            onClick={() => navigate("/cadastro")}
            className="font-medium text-orange-400 transition-colors hover:text-orange-500"
          >
            Cadastrar
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

