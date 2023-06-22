import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
  } from "@material-tailwind/react";
  import { XMarkIcon } from "@heroicons/react/24/solid";
  import { ingredientesOptions, medidaCaseiraOptions } from "../../data";
  import Select from 'react-select';
  
  import { useFormik } from "formik";
  import * as yup from "yup";
  
  const validationSchema = yup.object({
      pesoBruto: yup.string().trim().min(3, "Por favor digite um nome válido").required("Campo obrigatório"),
  });
  
   
  export const PreparacaoModalAdd = ({ show, handleShow }) => {
  
      const onSubmit = (values) => {
          console.log("Botão add funcionando");
      }
    
      const formik = useFormik({
          initialValues: {
              pesoBruto: "",
              unidade: "",
              indicadorParteComestivel: "",
              pesoLiquido: "",
              perCapita: "",
              medidaCaseira: "",
              embalagem: "",
              preco: "",
              custoPreparacao: "",
          }, 
          validateOnBlur: true,
          onSubmit,
          validationSchema: validationSchema,
      })
   
      return (
          <>
              <Dialog open={show} handler={handleShow}>
                  <div className="flex items-center justify-between">
                      <DialogHeader>Ingrediente</DialogHeader>
                      <XMarkIcon className="mr-3 h-5 w-5" onClick={handleShow} />
                  </div>
                  <DialogBody divider>
                      <form onSubmit={formik.handleSubmit}>
                          <div className="grid gap-6">
                              <Select
                                  theme={(theme) => ({
                                      ...theme,
                                      borderRadius: 0,
                                      colors: {
                                        ...theme.colors,
                                        primary25: "silver",
                                        primary: "orange"
                                      }
                                    })}
                                  placeholder="Selecionar ingrediente"
                                  name="Ingredientes"
                                  options={ingredientesOptions}
                                  className="basic-single"
                                  classNamePrefix="select"
                              />
                          </div>
                          <div className="my-4 flex items-center gap-4">
                              <Input
                                  id="pesoBruto"
                                  type="number"
                                  color="orange"
                                  label="Peso Bruto"
                                  maxLength={4}
                                  containerProps={{ className: "min-w-[72px]" }}
                              />
                              <Input
                                  id="unidade"
                                  type="number"
                                  color="orange"
                                  label="Unidade"
                                  maxLength={4}
                                  containerProps={{ className: "min-w-[72px]" }}
                              />
                          </div>
                          <div className="my-4 flex items-center gap-4">
                              <Input
                                  id="indicadorParteComestivel"
                                  type="number"
                                  color="orange"
                                  label="Indicador de Parte Comestível"
                                  maxLength={4}
                                  containerProps={{ className: "min-w-[72px]" }}
                              />
                              <Input
                                  id="pesoLiquido"
                                  type="number"
                                  color="orange"
                                  label="Peso Líquido"
                                  maxLength={4}
                                  containerProps={{ className: "min-w-[72px]" }}
                              />
                          </div>
                          <div className="grid gap-6">
                              <Select
                                  theme={(theme) => ({
                                      ...theme,
                                      borderRadius: 0,
                                      colors: {
                                        ...theme.colors,
                                        primary25: "silver",
                                        primary: "orange"
                                      }
                                  })} 
                                  placeholder="Selecione a medida"
                                  name="Medida Caseira"
                                  options={medidaCaseiraOptions}
                                  className="basic-single"
                                  classNamePrefix="select"
                              />
                          </div>
                          <div className="my-4 flex items-center gap-4">
                              <Input
                                  id="perCapita"
                                  type="number"
                                  color="orange"
                                  label="Per Capita"
                                  maxLength={4}
                                  containerProps={{ className: "min-w-[72px]" }}
                              />
                              <Input
                                  id="embalagem"
                                  type="number"
                                  color="orange"
                                  label="Embalagem"
                                  maxLength={4}
                                  containerProps={{ className: "min-w-[72px]" }}
                              />
                          </div>
                          <div className="my-4 flex items-center gap-4">
                              <Input
                                  id="preco"
                                  type="number"
                                  color="orange"
                                  label="Preço"
                                  maxLength={4}
                                  containerProps={{ className: "min-w-[72px]" }}
                              />
                              <Input
                                  id="custoPreparo"
                                  type="number"
                                  color="orange"
                                  label="Custo de Preparo"
                                  maxLength={4}
                                  containerProps={{ className: "min-w-[72px]" }}
                              />
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
          </>
      );
  }