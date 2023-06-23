import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";

import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
  

  
  /*
  const MAX_FILE_SIZE = 102400;
  const validFileExtensions = { image: ['jpg', 'png', 'jpeg', 'svg', 'webp'] };
  
  
  function isValidFileType(fileName, fileType) {
      return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1;
    }
  */
  
  const validationSchema = yup.object({
      /*
      imagem: yup.mixed().required("Campo obrigatótio")
      .test("is-valid-type", "Not a valid image type",
        value => isValidFileType(value && value.name.toLowerCase(), "image"))
      .test("is-valid-size", "Max allowed size is 100KB",
        value => value && value.size <= MAX_FILE_SIZE),
        */
      nome: yup.string().min(3, "Por favor digite um nome válido").required("Campo obrigatório"),
      empresa: yup.number().required("Campo obrigatório"),
      numPorcoes: yup.number().required("Campo obrigatório")
  });
  
   
  export const AdicionarPreparacoes = ({ showAddModal, handleAddModal }) => {
    const navigate = useNavigate()
    const [preparacoes, setPreparacoes] = useState({
      nome: "",
      numPorcoes: "",
      empresa: ""
    });

    const URL = "http://localhost:3000/preparacoes"

    const { nome, numPorcoes, empresa } = preparacoes
    const onInputChange = (e) => {
      setPreparacoes({...preparacoes, [e.target.name]: e.target.value})
    } 
  
    const onSubmit = async (e) => {
      e.preventDefault()
      try {
        const response = await axios.post(URL, preparacoes)
        navigate("/")
        const data = response.data
        console.log(data)
        setPreparacoes([...preparacoes, data])
      } catch(error){
        console.error()
      }
    }
   
    return (
      <Formik
        initialValues={{
          nome: "",
          numPorcoes: "",
          empresa: ""
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values)
        }}
      >
        {(formik) => (
          <Dialog open={showAddModal} onClose={handleAddModal}>
            <div className="flex items-center justify-between">
              <DialogHeader>Preparação</DialogHeader>
              <XMarkIcon className="mr-3 h-5 w-5" onClick={handleAddModal} />
            </div>
            <DialogBody divider>
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
                  <span className="text-sm leading-6 text-red-600">
                    {formik.touched.nome && formik.errors.nome ? formik.errors.nome : ""}
                  </span>
                  <Input
                    id="numPorcoes"
                    name="numPorcoes"
                    type="number"
                    color="orange"
                    label="Número de Porções"
                    value={numPorcoes}
                    onChange={(e) => onInputChange(e)}
                  />
                  <span className="text-sm leading-6 text-red-600">
                  {formik.touched.numPorcoes && formik.errors.numPorcoes ? formik.errors.numPorcoes : ""}
                  </span>
                  <Input
                    id="empresa"
                    name="empresa"
                    type="number"
                    color="orange"
                    label="ID da Empresa"
                    value={empresa}
                    onChange={(e) => onInputChange(e)}
                  />
                  <span className="text-sm leading-6 text-red-600">
                  {formik.touched.empresa && formik.errors.empresa ? formik.errors.empresa : ""}
                  </span>
                </div>
                <div>
                  <Button type="submit" variant="gradient" color="green" onClick={(e) => onInputChange(e)}>
                    adicionar
                  </Button>
                </div>
              </form>
            </DialogBody>  
            <DialogFooter>
              <Button variant="outlined" color="red" onClick={handleAddModal}>
              fechar
              </Button>
            </DialogFooter>    
          </Dialog>
        )}
      </Formik>
    );
  }