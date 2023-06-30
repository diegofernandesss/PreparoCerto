import React, { useContext, useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { AuthContext } from '../Context/AuthContext';

export function Login() {
  const { handleLogin } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Código de exemplo com autenticação "fake"
    if (username === "admin" && password === "password") {
      const token = "fakeToken";
      handleLogin(token);
    } else {
      setError("Usuário ou senha inválidos");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Entrar
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Insira seus dados para entrar.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleFormSubmit}>
          <div className="mb-4 flex flex-col gap-6">
            <Input
              size="lg"
              label="Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="password"
              size="lg"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <Button className="mt-6" fullWidth type="submit">
            Entrar
          </Button>
          {error && <Typography color="red" className="mt-4 text-center font-normal">{error}</Typography>}
          <Typography color="gray" className="mt-4 text-center font-normal">
            Não possui uma Conta?{" "}
            <a
              href="#"
              className="font-medium text-blue-500 transition-colors hover:text-blue-700"
            >
              Cadastrar
            </a>
          </Typography>
        </form>
      </Card>
    </div>
  );
}
