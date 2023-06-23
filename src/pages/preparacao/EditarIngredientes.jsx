import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import { Button, Card, CardBody, CardFooter, Input, Select } from "@material-tailwind/react";

const URL = ""

export const EditarIngredientes = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [ingredients, setIngredients] = useState([]);
    const [selectedIngredient, setSelectedIngredient] = useState('');

    const [medidasCaseiras, setMedidasCaseiras] = useState([]);
    const [selectedMedidaCaseira, setSelectedMedidaCaseira] = useState('');

    const [preparacao, setPreparacao] = useState({
        ingrediente: "",
        pesoBruto: "",
        unidade: "",
        indicadorParteComestivel: "",
        pesoLiquido: "",
        perCapita: "",
        medidaCaseira: "",
        embalagem: "",
        preco: "",
        custoPreparacao: "",
        
    });

    const { pesoBruto, unidade, indicadorParteComestivel, pesoLiquido, 
        perCapita, embalagem, preco, custoPreparacao } = preparacao

    const onInputChange = (e) => {
      setPreparacao({...preparacao, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        const fetchIngredients = async () => {
            try {
              const response = await axios.get(URL); 
              setIngredients(response.data.ingredients);
            } catch (error) {
              console.error('Erro ao obter ingredientes:', error);
            }
          }

        const fetchMedidasCaseiras = async () => {
        try {
            const response = await axios.get(URL); // Substitua 'URL_DA_API' pela URL correta da sua API
            setMedidasCaseiras(response.data.medidasCaseiras);
        } catch (error) {
            console.error('Erro ao obter medidas caseiras:', error);
        }
        };
    
        fetchMedidasCaseiras();
        fetchIngredients();
        getIngredientes()
    }, [])

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${URL}/${id}`, preparacao);
            navigate("/");
            const data = response.data;
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };
  
    const getIngredientes = async () => {
        try {
            const resultado = await axios.get(`${URL}/${id}`);
            setPreparacao(resultado.data);
        } catch (error) {
            console.error(error);
        }
    }

    const handleIngredientChange = (event) => {
        setSelectedIngredient(event.target.value);
    };

    const handleMedidaCaseiraChange = (event) => {
        setSelectedMedidaCaseira(event.target.value);
    };
    
    return (
      <>
        <div className="h-screen flex items-center justify-center">
            <Card color="transparent" shadow={true} className="mt-6 w-96">
                <CardBody>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="grid gap-6">
                            <Select value={selectedIngredient} onChange={handleIngredientChange}>
                                <option value="">Selecione um ingrediente</option>
                                {ingredients.map((ingredient) => (
                                <option key={ingredient.id} value={ingredient.id}>
                                    {ingredient.name}
                                </option>
                            ))}
                            </Select>
                        </div>
                <div className="my-4 flex items-center gap-4">
                    <Input
                        id="pesoBruto"
                        name="pesoBruto"
                        type="number"
                        value={pesoBruto}
                        color="orange"
                        label="Peso Bruto"
                        maxLength={4}
                        containerProps={{ className: "min-w-[72px]" }}
                        onClick={(e) => onInputChange(e)}
                    />
                    <Input
                        id="unidade"
                        name="unidade"
                        type="number"
                        value={unidade}
                        color="orange"
                        label="Unidade"
                        maxLength={4}
                        containerProps={{ className: "min-w-[72px]" }}
                        onClick={(e) => onInputChange(e)}
                    />
                    </div>
                    <div className="my-4 flex items-center gap-4">
                        <Input
                            id="indicadorParteComestivel"
                            name="indicadorParteComestivel"
                            type="number"
                            value={indicadorParteComestivel}
                            color="orange"
                            label="Indicador de Parte Comestível"
                            maxLength={4}
                            containerProps={{ className: "min-w-[72px]" }}
                            onClick={(e) => onInputChange(e)}
                        />
                        <Input
                            id="pesoLiquido"
                            name="pesoLiquido"
                            type="number"
                            value={pesoLiquido}
                            color="orange"
                            label="Peso Líquido"
                            maxLength={4}
                            containerProps={{ className: "min-w-[72px]" }}
                            onClick={(e) => onInputChange(e)}
                        />
                    </div>
                    <div className="grid gap-6">
                        <Select value={selectedMedidaCaseira} onChange={handleMedidaCaseiraChange}>
                            <option value="">Selecione uma medida caseira</option>
                            {medidasCaseiras.map((medidaCaseira) => (
                            <option key={medidaCaseira.id} value={medidaCaseira.id}>
                                {medidaCaseira.name}
                            </option>
                            ))}
                        </Select>
                    </div>
                    <div className="my-4 flex items-center gap-4">
                        <Input
                            id="perCapita"
                            name="perCapita"
                            type="number"
                            value={perCapita}
                            color="orange"
                            label="Per Capita"
                            maxLength={4}
                            containerProps={{ className: "min-w-[72px]" }}
                            onClick={(e) => onInputChange(e)}
                        />
                        <Input
                            id="embalagem"
                            name="embalagem"
                            type="number"
                            value={embalagem}
                            color="orange"
                            label="Embalagem"
                            maxLength={4}
                            containerProps={{ className: "min-w-[72px]" }}
                            onClick={(e) => onInputChange(e)}
                        />
                    </div>
                    <div className="my-4 flex items-center gap-4">
                        <Input
                            id="preco"
                            name="preco"
                            type="number"
                            value={preco}
                            color="orange"
                            label="Preço"
                            maxLength={4}
                            containerProps={{ className: "min-w-[72px]" }}
                            onClick={(e) => onInputChange(e)}
                        />
                        <Input
                            id="custoPreparacao"
                            name="custoPreparacao"
                            type="number"
                            value={custoPreparacao}
                            color="orange"
                            label="Custo de Preparo"
                            maxLength={4}
                            containerProps={{ className: "min-w-[72px]" }}
                            onClick={(e) => onInputChange(e)}
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