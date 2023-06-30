import { useState, useEffect } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";

import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input, Select } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
  
  const validationSchema = yup.object({
        pesoBruto: yup.string().trim().min(3, "Por favor digite um nome válido").required("Campo obrigatório"),
  });
  
   
export const AdicionarIngredientes = ({ show, handleShow }) => {
    const navigate = useNavigate()
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
    })

    const URL = ""

    const { pesoBruto, unidade, indicadorParteComestivel, pesoLiquido, 
        perCapita, embalagem, preco, custoPreparacao } = preparacao

    const onInputChange = (e) => {
        setPreparacao({...preparacao, [e.target.name]: e.target.value})
    } 
    const onSubmit = async (e) => {
        e.preventDefault()
        try {
          const response = await axios.post(URL, preparacao)
          navigate("/")
          const data = response.data
          console.log(data)
          setPreparacao([...preparacao, data])
        } catch(error){
          console.error()
        }
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
    }, [])
  
    const handleIngredientChange = (event) => {
        setSelectedIngredient(event.target.value);
    };

    const handleMedidaCaseiraChange = (event) => {
        setSelectedMedidaCaseira(event.target.value);
    };

   
    return (
        <Formik
            initialValues={{
                ingrediente: "",
                pesoBruto: "",
                unidade: "",
                indicadorParteComestivel: "",
                pesoLiquido: "",
                perCapita: "",
                medidaCaseira: "",
                embalagem: "",
                preco: "",
                custoPreparacao: ""
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                console.log(values)
            }}
            >
            {(formik) => (
                <Dialog open={show} handler={handleShow}>
                <div className="flex items-center justify-between">
                    <DialogHeader>Ingrediente</DialogHeader>
                    <XMarkIcon className="mr-3 h-5 w-5" onClick={handleShow} />
                </div>
                <DialogBody divider>
                    <form onSubmit={formik.handleSubmit}>
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
                </DialogBody>
                <DialogFooter className="space-x-2">
                    <Button variant="outlined" color="red" onClick={handleShow}>
                        fechar
                    </Button>
                    <Button variant="gradient" color="green" onClick={onSubmit}>
                        adicionar
                    </Button>
                </DialogFooter>
            </Dialog>
            )}
        </Formik>
    );
}