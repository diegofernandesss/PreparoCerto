import { useFormik } from 'formik';
import * as yup from 'yup';
import { api } from '../../service/api';
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input, Select, Option } from '@material-tailwind/react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';

export const AdicionarPreparacao = ({ showAddModal, preparacao, setPreparacao, setShowAddModal, preparar, setPreparar, id}) => {

  const [preparacaoList, setPreparacaoList] = useState([]);
  const [ingredienteList, setIngredienteList] = useState([]);
  const [unidadeList, setUnidadeList] = useState([]);
  const [medidaList, setMedidaList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const preparaResponse = await api.get(`preparacao/${id}`);
        const preparacaoData = [preparaResponse.data];
        setPreparacaoList(preparacaoData);

        const ingrediente = await api.get(`ingredientes`);
        setIngredienteList(ingrediente.data);

        const unidade = await api.get(`unidade`);
        setUnidadeList(unidade.data)

        const medida = await api.get(`medidas`);
        setMedidaList(medida.data)

      } catch (error) {
        console.error("Erro ao obter a preparação", error);
      } 
    };
    fetchData();
  }, []);


  const validationSchema = yup.object({
    idPreparacao: yup
      .number()
      .required("Campo obrigatório"),
    idIngrediente: yup
      .number()
      .required("Campo obrigatório"),
    pesoBruto: yup
      .number()
      .required("Campo obrigatório"),
    idUnidade: yup
      .number()
      .required("Campo obrigatório"),
    indicador: yup
      .number()
      .required("Campo obrigatório"),
    pesoLiquido: yup
      .number()
      .required("Campo obrigatório"),
    perCapita: yup
      .number()
      .required("Campo obrigatório"),
    medCaseira: yup
      .number()
      .required("Campo obrigatório"),
    embalagem: yup
      .number()
      .required("Campo obrigatório"),
    preco: yup
      .number()
      .required("Campo obrigatório"),
    custPreparacao: yup
      .number()
      .required("Campo obrigatório"),
  });

  const onClose = () => {
    setPreparar({})
    formik.resetForm()
    setShowAddModal(!showAddModal)
  }


    const onSubmit = async (values, { resetForm }) => {
      const information = {
        preparacao: {
          id: values.idPreparacao
        },
        ingrediente: {
          id: values.idIngrediente
        },
        pesoBruto: values.pesoBruto,
        unidade: {
          id: values.idUnidade
        },
        indicadorParteComestivel: values.indicador,
        pesoLiquido: values.pesoLiquido,
        perCapita: values.perCapita,
        medidaCaseira: {
          id: values.medCaseira,
        },
        embalagem: values.embalagem,
        preco: values.preco,
        custoPreparacao: values.custPreparacao
      }

      const informationUpdate = {
        ingrediente: {
          id: values.idIngrediente
        },
        preparacao: {
          id: values.idPreparacao
        }
      };

      try {
        if(preparar.id) {
          const response = await api.put(`/preparacao_ingrediente/${preparar.id}`, informationUpdate)
          setPreparacao((state) => state.map((prepararState) =>prepararState.id === preparar.id ? response.data : prepararState))
          setShowAddModal(false);
          setPreparar({})
        } else {
          const response = await api.post("preparacao_ingrediente", information)
          const data = response.data;
          setPreparacao([...preparacao, data]);
          setShowAddModal(false);
          resetForm();
        }
        
      } catch (error) {
        console.error('Erro ao Adicionar/Atualizar Preparação', error);
      }
    };

    const formik = useFormik({
      initialValues: {
        idPreparacao: "",
        idIngrediente: {},
        pesoBruto: "",
        idUnidade: {},
        indicador: "",
        pesoLiquido: "",
        perCapita: "",
        medCaseira: {},
        embalagem: "",
        preco: "",
        custPreparacao: ""

      },
      validateOnBlur: true,
      onSubmit,
      validationSchema: validationSchema,
    });

    
    useEffect(() => {
      if (preparar.id) {
        formik.setFieldValue("idPreparacao", preparar.id)
        formik.setFieldValue("idIngrediente", preparar.ingrediente.nome)
        formik.setFieldValue("pesoBruto", preparar.pesoBruto)
        formik.setFieldValue("idUnidade", preparar.ingrediente.sigla)
        formik.setFieldValue("pesoLiquido", preparar.pesoLiquido)
        formik.setFieldValue("medCaseira", preparar.medidaCaseira.quantidade)
        formik.setFieldValue("embalagem", preparar.embalagem)
        formik.setFieldValue("preco", preparar.preco)
        formik.setFieldValue("custPreparacao", preparar.custoPreparacao)
      }
    }, [preparar])
   
    const handleSelectChange = (filename, value) => {formik.setFieldValue(filename, value)};

    return (
      <Dialog open={showAddModal}>
      <div className="flex items-center justify-between">
        <DialogHeader>Preparação</DialogHeader>
        <XMarkIcon className="mr-3 h-5 w-5" onClick={() => onClose()} />
      </div>
      <DialogBody divider>
        <form onSubmit={formik.handleSubmit} className="gap-6">
          <div className="grid  grid-cols-2 gap-6">
          <div>
            <Input 
              id="pesoBruto" 
              name="pesoBruto"
              color="orange" 
              type="text"
              label="Informe o Peso Bruto"
              onChange={(e) => {formik.handleChange(e)}}
              value={formik.values.pesoBruto}
              required
              />
            <span className="text-sm leading-6 text-red-600">
              {formik.touched.pesoBruto && formik.errors.pesoBruto ? formik.errors.pesoBruto : ""}
            </span>
            </div>
          <div>
          <Select
            id="idPreparacao"
            label="Selecione a Preparação"
            value={formik.values.idPreparacao}
            onChange={(value) => handleSelectChange("idPreparacao", value)}
            color="orange"
          >
            {preparacaoList.map((prep) => (
              <Option key={prep.id} value={prep.id}>
                {prep.nome}
              </Option>
            ))}
          </Select>
          <span className="text-sm leading-6 text-red-600">
            {formik.touched.idPreparacao && formik.errors.idPreparacao
              ? formik.errors.idPreparacao
              : ""}
          </span>
          </div>
          <div>
            <Select
              id="idIngrediente"
              label="Selecione o Ingrediente"
              value={formik.values.idIngrediente}
              onChange={(value) => handleSelectChange("idIngrediente", value)}
              color="orange"
            >
              {ingredienteList.map((ingred) => (
                <Option key={ingred.id} value={ingred.id}>
                  {ingred.nome}
                </Option>
              ))}
            </Select>
            <span className="text-sm leading-6 text-red-600">
              {formik.touched.idIngrediente && formik.errors.idIngrediente ? formik.errors.idIngrediente : ""}
            </span>
            </div>
            
            <div>
            <Select
              id="idUnidade"
              label="Selecione a Unidade"
              value={formik.values.idUnidade}
              onChange={(value) => handleSelectChange("idUnidade", value)}
              color="orange"
            >
              {unidadeList.map((unid) => (
                <Option key={unid.id} value={unid.id}>
                  {unid.sigla}
                </Option>
              ))}
            </Select>
            <span className="text-sm leading-6 text-red-600">
            {formik.touched.idUnidade && formik.errors.idUnidade ? formik.errors.idUnidade : ""}
            </span>
            </div>
            <div>
            <Input
              id="indicador"
              name="indicador"
              type="number"
              color="orange"
              label="Informe o Indicador Parte Comestível"
              value={formik.values.indicador}
              onChange={formik.handleChange}
              required
            />
            <span className="text-sm leading-6 text-red-600">
              {formik.touched.indicador && formik.errors.indicador ? formik.errors.indicador : ""}
              </span>
              </div>
              <div>
              <Input
                id="pesoLiquido"
                name="pesoLiquido"
                type="number"
                color="orange"
                label="Informe o Peso Líquido"
                value={formik.values.pesoLiquido}
                onChange={(e) => {formik.handleChange(e)}}
                required
              />
              <span className="text-sm leading-6 text-red-600">
              {formik.touched.pesoLiquido && formik.errors.pesoLiquido ? formik.errors.pesoLiquido : ""}
              </span>
              </div>
              <div>
              <Input
                id="perCapita"
                name="perCapita"
                type="number"
                color="orange"
                label="Informe o Valor Per Capita"
                value={formik.values.perCapita}
                onChange={(e) => {formik.handleChange(e)}}
                required
              />
              <span className="text-sm leading-6 text-red-600">
              {formik.touched.perCapita && formik.errors.perCapita ? formik.errors.perCapita : ""}
              </span>
              </div>
              <div>
              <Select
                  id="medCaseira"
                  label="Selecione a Medida Caseira (quant.)"
                  value={formik.values.medCaseira}
                  onChange={(value) => handleSelectChange("medCaseira", value)}
                  color="orange"
                >
                {medidaList.map((med) => (
                  <Option key={med.id} value={med.id}>
                    {med.quantidade}
                  </Option>
                ))}
              </Select>
              <span className="text-sm leading-6 text-red-600">
                {formik.touched.medCaseira && formik.errors.medCaseira ? formik.errors.medCaseira : ""}
              </span>
              </div>
              <div>
              <Input
                id="embalagem"
                name="embalagem"
                type="number"
                color="orange"
                label="Informe a Embalagem"
                value={formik.values.embalagem}
                onChange={(e) => {formik.handleChange(e)}}
                required
              />
              <span className="text-sm leading-6 text-red-600">
                {formik.touched.embalagem && formik.errors.embalagem ? formik.errors.embalagem : ""}
              </span>
              </div>
              <div>
              <Input
                id="preco"
                name="preco"
                type="number"
                color="orange"
                label="Informe o Preço"
                value={formik.values.preco}
                onChange={(e) => {formik.handleChange(e)}}
                required
              />
              <span className="text-sm leading-6 text-red-600">
                {formik.touched.preco && formik.errors.preco ? formik.errors.preco : ""}
              </span>
              </div>
              <div>
              <Input
                id="custPreparacao"
                name="custPreparacao"
                type="number"
                color="orange"
                label="Informe o Custo da Preparação"
                value={formik.values.custPreparacao}
                onChange={(e) => {formik.handleChange(e)}}
                required
              />
              <span className="text-sm leading-6 text-red-600">
                {formik.touched.custPreparacao && formik.errors.custPreparacao ? formik.errors.custPreparacao : ""}
              </span>
              </div>
            </div>
            <div>
            <Button className='mt-6' type="submit" variant="gradient" color="orange">
              {preparacao.id ? "Atualizar" : "Adicionar"}
            </Button>
                </div>
              </form>
            </DialogBody>  
            <DialogFooter>
              <Button variant="outlined" color="red"  onClick={() => onClose()}>
              Fechar
              </Button>
            </DialogFooter>    
          </Dialog>
    );
  }