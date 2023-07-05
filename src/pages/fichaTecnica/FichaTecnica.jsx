import { Dialog, DialogHeader, DialogBody, Button, DialogFooter } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/solid";

export const FichaTecnica = ({ showModal, setShowModal, fichaTecnica }) => {
  const onClose = () => {
    setShowModal(!showModal)
  }

  const formatCurrency = (value) => {
    if (value !== undefined && value !== null) {
      return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }
    return '';
  }

  return (
    <>
      <Dialog open={showModal}>
        <div className="flex items-center justify-between">
          <DialogHeader><span className="font-bold">Ficha Técnica Gerencial</span></DialogHeader>
          <XMarkIcon className="mr-3 h-5 w-5" onClick={() => onClose()} />
        </div>
        <DialogBody divider>
          <form>
            <div className="grid gap-6">
              {fichaTecnica.ingredientes && fichaTecnica.ingredientes.map((ingrediente) => (
                <div key={ingrediente.id} className="flex">
                  <span className="mr-2"><span className="font-bold">Ingrediente:</span> {ingrediente.ingrediente.nome}</span>
                  <span className="mr-2"><span className="font-bold">Embalagem:</span> {ingrediente.embalagem}</span>
                  <span className="mr-2"><span className="font-bold">Preço:</span> {formatCurrency(ingrediente.preco)}</span>
                  <span><span className="font-bold">Custo Preparação:</span> {formatCurrency(ingrediente.custoPreparacao)}</span>
                </div>
              ))} 
              <div className="flex">
                <span className="mr-2"><span className="font-bold">Número de porções:</span></span>
                <span>{fichaTecnica.numPorcoes}</span>
              </div>
              <div className="flex">
                <span className="mr-2"><span className="font-bold">Total:</span></span>
                <span>{formatCurrency(fichaTecnica.total)}</span>
              </div>
              <div className="flex">
                <span className="mr-2"><span className="font-bold">Valor por porção:</span></span>
                <span>{formatCurrency(fichaTecnica.valorPorcao)}</span>
              </div>
              <div className="flex">
                <span className="mr-2"><span className="font-bold">Valor sugerido:</span></span>
                <span>{formatCurrency(fichaTecnica.valorSugerido)}</span>
              </div>
            </div>
          </form>
        </DialogBody>
        <DialogFooter>
          <Button variant="outlined" color="red" onClick={() => onClose()}>
            Fechar
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
