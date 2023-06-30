import * as yup from "yup";
import { cnpj as validatorCnpj } from 'cpf-cnpj-validator'; 
import { useFormik } from 'formik';

import { api } from '../../service/api'

import { Button, 
         Dialog, 
         DialogHeader, 
         DialogBody, 
         DialogFooter, 
         Input,
         Select, 
         Option 
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

export const AdicionarEmpresa = ({ showAddModal, empresas, setShowAddModal, setEmpresas, empresa, setEmpresa}) => {

  const [proprietarioList, setProprietarioList] = useState([]);

  const handleSelectChange = (value) => {formik.setFieldValue('id', value)};

  const onClose = () => {
    formik.resetForm()
    setShowAddModal(!showAddModal)
    setEmpresa({});
  }

  const isCnpjValid = (cnpj) => {
    return validatorCnpj.isValid(cnpj);
  };

  const validationSchema = yup.object({
    nome: yup
      .string()
      .trim()
      .required("Campo obrigatório")
      .matches(/^[A-Z].*$/, "O nome deve começar com uma letra maiúscula"),
    cnpj: yup
      .string()
      .trim()
      .required("Campo obrigatório")
      .test("valid-cnpj", "CNPJ inválido", (value) => {
        return isCnpjValid(value);
      }),
    id: yup
      .number()
      .typeError("O ID deve ser um número")
      .required("Campo obrigatório")
      .positive("O ID deve ser um número positivo")
      .test("is-number", "O ID deve conter apenas números", (value) => {
        if (value) {
          const regex = /^[0-9]+$/;
          return regex.test(value.toString());
        }
        return true;
      }),
  });


  useEffect(() => {
    const fetchData = async () => {
      try {
        const proprietarioResponse = await api.get("proprietarios");
        const proprietario = proprietarioResponse.data;
        setProprietarioList(proprietario);
      } catch (error) {
        console.error("Erro ao obter os dados", error);
      }
    };
    fetchData();
  }, []);

  const formatCnpj = (value) => {
    const cnpj = value.replace(/\D/g, '');
    if (cnpj.length <= 14) {
      return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2}).*/, '$1.$2.$3/$4-$5').slice(0, 18);
    }
    return value.slice(0, 18);
  };

  const onSubmit = async (values, { resetForm }) => {
    const information = {
      nome: values.nome,
      cnpj: values.cnpj,
      proprietario: {
        id: parseInt(values.id)
      }
    };

    const informationUpdate = {
      nome: values.nome,
      cnpj: values.cnpj
    }
    
    try {
      if(empresa.id) {
        const response = await api.put(`/empresas/${empresa.id}`, informationUpdate)
        setEmpresas((state) => state.map((empresaState) => empresaState.id === empresa.id ? response.data.empresa : empresaState))
        setEmpresa({});
        resetForm();
        setShowAddModal(false);
      } else {
        const response = await api.post("/empresas", information);
        const data = response.data.empresa;
        setEmpresas([...empresas, data]);
        setShowAddModal(false);
        resetForm();
      }
    } catch (error) {
      console.log('Erro ao Adicionar Empresa', error);
    }
  };
   
  const formik = useFormik({
    initialValues: {
      nome: "",
      cnpj: "",
      proprietario: {}
    },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });

  useEffect(() => {
    if (empresa.id) {
      formik.setFieldValue("nome", empresa.nome)
      formik.setFieldValue("cnpj", empresa.cnpj)
      formik.setFieldValue("id", empresa.proprietario.id)
    }
  }, [empresa])

    return (
          <Dialog open={showAddModal} >
            <div className="flex items-center justify-between">
              <DialogHeader>Empresa</DialogHeader>
              <XMarkIcon className="mr-3 h-5 w-5" onClick={ () => onClose()} />
            </div>
            <DialogBody divider>
              <form onSubmit={formik.handleSubmit}>
                <div className="grid gap-6">
                  <Input 
                    id="nome" 
                    name="nome"
                    color="orange" 
                    type="text"
                    label="Digite o Nome da Empresa"
                    onChange={(e) => {formik.handleChange(e)}}
                    value={formik.values.nome}
                    onBlur={formik.handleBlur}
                    required
                    />
                  <span className="text-sm leading-6 text-red-600">
                    {formik.touched.nome && formik.errors.nome ? formik.errors.nome : ""}
                  </span>
                  <Input
                    id="cnpj"
                    name="cnpj"
                    type="text"
                    color="orange"
                    label="Digite seu CNPJ"
                    value={formik.values.cnpj}
                    onBlur={formik.handleBlur}
                    onChange={(e) => {
                      const formattedCnpj = formatCnpj(e.target.value);
                      formik.handleChange(e);
                      formik.setFieldValue("cnpj", formattedCnpj);
                    }}
                    required
                  />
                  <span className="text-sm leading-6 text-red-600">
                    {formik.touched.cnpj && formik.errors.cnpj ? formik.errors.cnpj : ""}
                  </span>
                  <Select
                    id="id"
                    label="Selecione um Proprietario"
                    value={formik.values.id}
                    onChange={handleSelectChange}
                    onBlur={formik.handleBlur}
                    color="orange"
                    disabled={empresa.id ? true : false}
                  >
                    {proprietarioList.map((proprietario) => (
                      <Option key={proprietario.id} value={proprietario.id}>
                        {proprietario.nome}
                      </Option>
                    ))}
                  </Select>
                  <span className="text-sm leading-6 text-red-600">
                  {formik.touched.id && formik.errors.id ? formik.errors.id : ""}
                </span>
                </div>
                <div>
                <Button className='mt-6' type="submit" variant="gradient" color="orange">
                  {empresa.id ? "Atualizar" : "Adicionar"}
                </Button>
                </div>
              </form>
            </DialogBody>  
            <DialogFooter>
              <Button variant="outlined" color="red" onClick={ () => onClose()}>
              fechar
              </Button>
            </DialogFooter>    
          </Dialog>
    );
  }