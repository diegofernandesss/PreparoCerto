import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";
   
  export const Cadastro = () => {
    return (
        <div className="h-screen flex items-center justify-center">
            <Card color="transparent" shadow={false}>
                <Typography variant="h4" color="blue-gray">
                Cadastre-se
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                Enter your details to register.
                </Typography>
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                    <div className="mb-4 flex flex-col gap-6">
                        <Input size="lg" label="Nome" />
                        <Input size="lg" label="E-mail" />
                        <Input type="password" size="lg" label="Senha" />
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
                    <Button color="orange" className="mt-6" fullWidth>
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