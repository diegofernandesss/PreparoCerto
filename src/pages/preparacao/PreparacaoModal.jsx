import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/solid";

import { useFormik } from "formik";
import * as yup from "yup";

const MAX_FILE_SIZE = 102400;
const validFileExtensions = { image: ['jpg', 'png', 'jpeg', 'svg', 'webp'] };

function isValidFileType(fileName, fileType) {
    return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1;
  }

const validationSchema = yup.object({
    imagem: yup.mixed().required("Campo obrigatótio")
    .test("is-valid-type", "Not a valid image type",
      value => isValidFileType(value && value.name.toLowerCase(), "image"))
    .test("is-valid-size", "Max allowed size is 100KB",
      value => value && value.size <= MAX_FILE_SIZE),
    nome: yup.string().trim().min(3, "Por favor digite um nome válido").required("Campo obrigatório"),
    ingrediente: yup.string().trim().min(3, "Por favor digite um nome válido").required("Campo obrigatório"),
    medidaPorcao: yup.number().trim().test('is-decimal', 'invalid decimal', value => (value + "").match(/^\d*\.{1}\d*$/)),
    tempoPreparo: yup.number().trim().test('is-decimal', 'invalid decimal', value => (value + "").match(/^\d*\.{1}\d*$/)),
    rendimento: yup.number().trim().test('is-decimal', 'invalid decimal', value => (value + "").match(/^\d*\.{1}\d*$/)),
    numeroPorcoes: yup.number().trim().test('is-decimal', 'invalid decimal', value => (value + "").match(/^\d*\.{1}\d*$/)),
    indicadorConversao: yup.number().trim().test('is-decimal', 'invalid decimal', value => (value + "").match(/^\d*\.{1}\d*$/)),
    fatorCorrecaoGlobal: yup.number().trim().test('is-decimal', 'invalid decimal', value => (value + "").match(/^\d*\.{1}\d*$/)),
    custoPreparo: yup.number().trim().test('is-decimal', 'invalid decimal', value => (value + "").match(/^\d*\.{1}\d*$/)),
});

 
export const PreparacaoModal = ({ show, handleShow }) => {

    const onSubmit = (values) => {
        //alert(JSON.stringify(values, null, 2));
        console.log("Botão add funcionando");
    }
  
    const formik = useFormik({
        initialValues: {
            imagem: "",
            nome: "",
            ingrediente: "",
            medidaPorcao: "",
            tempoPreparo: "",
            rendimento: "",
            numeroPorcoes: "",
            indicadorConversao: "",
            fatorCorrecaoGlobal: "",
            custoPreparo: "",
        }, 
        validateOnBlur: true,
        onSubmit,
        validationSchema: validationSchema,
    })
 
    return (
        <>
            <Dialog open={show} handler={handleShow}>
                <div className="flex items-center justify-between">
                    <DialogHeader>Formulário</DialogHeader>
                    <XMarkIcon className="mr-3 h-5 w-5" onClick={handleShow} />
                </div>
                <DialogBody divider>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="grid gap-6">
                            <Input id="imagem" color="orange" type="file" />
                            <Input id="nome" color="orange" label="Nome" />
                            <Textarea id="modoPreparo" color="orange" label="Modo de Preparo" />
                        </div>
                        <div className="my-4 flex items-center gap-4">
                            <Input
                                id="tempoPreparo"
                                color="orange"
                                label="Tempo de Preparo"
                                maxLength={5}
                                containerProps={{ className: "min-w-[72px]" }}
                            />
                            <Input
                                id="rendimento"
                                color="orange"
                                label="Rendimento"
                                maxLength={4}
                                containerProps={{ className: "min-w-[72px]" }}
                            />
                        </div>
                        <div className="my-4 flex items-center gap-4">
                            <Input
                                id="numeroPorcoes"
                                color="orange"
                                label="Número de Porções"
                                maxLength={4}
                                containerProps={{ className: "min-w-[72px]" }}
                            />
                            <Input
                                id="indicadorConversao"
                                color="orange"
                                label="Indicador de Conversão"
                                maxLength={4}
                                containerProps={{ className: "min-w-[72px]" }}
                            />
                        </div>
                        <div className="my-4 flex items-center gap-4">
                            <Input
                                id="fatorCorrecaoGlobal"
                                color="orange"
                                label="Fator de Correção Global"
                                maxLength={4}
                                containerProps={{ className: "min-w-[72px]" }}
                            />
                            <Input
                                id="custoPreparo"
                                color="orange"
                                label="Custo de Preparo"
                                maxLength={4}
                                containerProps={{ className: "min-w-[72px]" }}
                            />
                        </div>
                        <div className="grid gap-6">
                            <Input
                                id="ingrediente"
                                color="orange"
                                label="Ingrediente"
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