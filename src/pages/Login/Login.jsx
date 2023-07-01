import React, { useContext } from "react";
import { useState } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { api } from '../../service/api'

export function Login() {
  const [email, emailChange] = useState("");
  const [password, passwordChange] = useState("");

  const onSubmit = async () => {
    const information = {
      email: email,
      senha: password
    };

    try {
      const response = await api.post(`login`, information)
      localStorage.setItem("token", response.data.token)
      
    } catch (error) {
      console.log('Erro ao fazr login', error);
    }
  };

  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Login
      </Typography>

      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" >
        <div className="mb-4 flex flex-col gap-6">
          <Input size="lg" label="Email" onChange={(e) => emailChange(e.target.value)} />
          <Input type="password" size="lg" label="Password" onChange={(e) => passwordChange(e.target.value)}/>
        </div>
        
        <Button className="mt-6" fullWidth  onClick={onSubmit}>
          Entrar
        </Button>
      </form>
    </Card>
  );
}
