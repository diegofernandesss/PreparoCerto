import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from '../../service/api'
import { Card, CardHeader, Typography, CardBody, Avatar, Button } from "@material-tailwind/react";

export const AdicionarPreparacao = () => {

  const { id } = useParams();

  const [post, setPost] = useState({});

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await api.get(`preparacao/${id}`);
      setPost(data);
    };
    fetchPost();
  }, []);

  return (
    <>
      <Card>
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <Typography className="mt-2" variant="h5" color="blue-gray">
              Preparação {post.nome}
            </Typography>
          </div>
        </CardHeader>
        <CardBody>
          <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
            <div className="flex items-center justify-between gap-4 shadow-blue-gray-900">
              <div className="flex items-center gap-4">
                <Avatar
                  src={`https://static.escolakids.uol.com.br/2020/07/frio-extremo.jpg`}
                  className="shadow-lg shadow-blue-gray-500/25"
                />
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-semibold"
                  >
                    Adicionar Unidade
                  </Typography>
                  <Button className="text-xs font-normal text-white" variant="gradient" color="orange">
                    Adicionar
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 shadow-blue-gray-900">
              <div className="flex items-center gap-4">
                <Avatar
                  src={`https://static.escolakids.uol.com.br/2020/07/frio-extremo.jpg`}
                  className="shadow-lg shadow-blue-gray-500/25"
                />
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-semibold"
                  >
                    Medida Caseira
                  </Typography>
                  <Button className="text-xs font-normal text-white" variant="gradient" color="orange">
                    Adicionar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
}
