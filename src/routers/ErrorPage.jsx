import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
  import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
  import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
  
  export const ErrorPage = () => {
    return (
      <div className="flex justify-center items-center h-screen">
        <Card className="mt-6 w-96">
          <CardBody>
            <ExclamationCircleIcon className="text-orange-500 w-12 h-12 mb-4" />
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Erro 404
            </Typography>
            <Typography>
              Página não Encontrada
            </Typography>
          </CardBody>
          <CardFooter className="pt-0">
              <Button size="sm" variant="text" color="orange" className="flex items-center gap-2">
                Página Inicial
                <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
              </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  