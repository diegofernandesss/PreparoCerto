import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";
import { Card, Input, Checkbox, Button, Typography, CardHeader } from "@material-tailwind/react";

const validationSchema = yup.object({
    nome: yup.string().min(3, "Por favor digite seu nome verdadeiro").required("Campo obrigatório"),
    email: yup.string().email("Digite um e-mail válido").required("Campo obrigatório"),
    senha: yup.string().required("Campo obrigatório").matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,12})/,
      "Deve conter 8 caracteres, uma maiúscula, uma minúscula, um número e um caractere especial"
    )
  });
   
export const Cadastro = () => {
    const navigate = useNavigate()

    const onSubmit = async (values) => {
        try {
            const response = await axios.post('http://localhost:3000/cadastro', values);
            navigate("/#")
            const data = response.data
            console.log(data)
            } catch (error) {
            console.error(error);
            }
    }
    
    const formik = useFormik({
        initialValues: {
          nome: "",
          email: "",
          senha: ""
        },
        validateOnBlur: true,
        onSubmit,
        validationSchema: validationSchema
    });
    
    return (
        <div className="h-screen flex items-center justify-center">
            <Card color="transparent" shadow={false} className="mt-6 w-96">
                <CardHeader shadow={false} className="grid h-28 place-items-center">
                    <Typography variant="h4" color="blue-gray">
                    Cadastre-se
                    </Typography>
                    <Typography color="gray" className="mt-1 font-normal">
                    
                    </Typography>
                </CardHeader>
                <form onSubmit={formik.handleSubmit} lassName="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                    <div className="mb-4 flex flex-col gap-6">
                        <Input 
                            id="nome" 
                            name="nome" 
                            type="text" 
                            size="lg" 
                            label="Nome" 
                            color="orange"
                            autoComplete="name"
                            value={formik.values.nome}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <span className="text-sm leading-6 text-red-600">
                        {formik.touched.nome && formik.errors.nome ? formik.errors.nome : ""}
                        </span>
                        <Input 
                            id="email" 
                            name="email" 
                            type="email" 
                            size="lg" 
                            label="E-mail" 
                            color="orange"
                            autoComplete="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <span className="text-sm leading-6 text-red-600">
                        {formik.touched.email && formik.errors.email ? formik.errors.email : ""}
                        </span>
                        <Input 
                            id="senha" 
                            name="senha" 
                            type="password" 
                            size="lg" 
                            label="Senha" 
                            color="orange"
                            value={formik.values.senha}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <span className="text-sm leading-6 text-red-600">
                        {formik.touched.senha && formik.errors.senha ? formik.errors.senha : ""}
                        </span>
                    </div>
                    <Checkbox
                        label={
                        (
                            <Typography
                            variant="small"
                            color="gray"
                            className="flex items-center font-normal"
                            >
                            Eu li e aceito os
                            <a
                            href="#"
                            className="font-medium transition-colors hover:text-orange-500"
                            >
                                &nbsp;Termos e Condições
                            </a>
                            </Typography>
                        )
                        }
                        containerProps={{ className: "-ml-2.5" }}
                    />
                    <Button type="submit" color="orange" className="mt-6" fullWidth>
                    Cadastrar
                    </Button>
                    <Typography color="gray" className="mt-4 text-center font-normal">
                        Já possui uma conta?{" "}
                        <a
                        href="#"
                        className="font-medium text-orange-400 transition-colors hover:text-orange-500"
                        >
                        Entrar
                        </a>
                        </Typography>
                </form>
            </Card>
        </div>
    );
  }