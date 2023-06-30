import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import { Button, Card, CardBody, CardFooter, Input } from "@material-tailwind/react";

const URL = "http://localhost:3000/preparacoes"

export const EditarPreparacoes = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [preparacoes, setPreparacoes] = useState({
        nome: "",
        numPorcoes: "",
        empresa: ""
        
    });

    const { nome, numPorcoes, empresa } = preparacoes
    const onInputChange = (e) => {
      setPreparacoes({...preparacoes, [e.target.name]: e.target.value })
    }

    useEffect(() => {
      getPreparacoes()
    }, [])

    const onSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.put(`${URL}/${id}`, preparacoes);
        navigate("/");
        const data = response.data;
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
  
    const getPreparacoes = async () => {
      try {
        const resultado = await axios.get(`${URL}/${id}`);
        setPreparacoes(resultado.data);
      } catch (error) {
        console.error(error);
      }
    };
   
    return (
      <>
        <div className="h-screen flex items-center justify-center">
            <Card color="transparent" shadow={true} className="mt-6 w-96">
                <CardBody>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="grid gap-6">
                            <Input 
                                id="nome" 
                                name="nome"
                                color="orange" 
                                type="text"
                                label="Nome" 
                                value={nome}
                                onChange={(e) => onInputChange(e)}
                                />
                            <Input
                                id="numPorcoes"
                                name="numPorcoes"
                                type="number"
                                color="orange"
                                label="Número de Porções"
                                value={numPorcoes}
                                onChange={(e) => onInputChange(e)}
                            />
                            <Input
                                id="empresa"
                                name="empresa"
                                type="number"
                                color="orange"
                                label="ID da Empresa"
                                value={empresa}
                                onChange={(e) => onInputChange(e)}
                            />
                            </div>
                            <div>
                                <Button className="mt-6" fullWidth type="submit" variant="gradient" color="green" onClick={(e) => onInputChange(e)}>
                                    salvar alterações
                                </Button>
                        </div>
                    </form>
                </CardBody>
                <CardFooter className="pt-0">
                    <Button 
                        size="sm" 
                        variant="outlined"
                        color="red"
                        fullWidth
                        onClick={() => navigate("/")}
                        >
                        Cancelar
                    </Button>
                </CardFooter>
            </Card>
        </div>
      </>
    );
  }