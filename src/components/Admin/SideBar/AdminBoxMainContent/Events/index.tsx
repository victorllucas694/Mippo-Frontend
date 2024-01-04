import { EventsAndProjectsBox } from "./styles";
import { useAuth } from "../../../../../contexts/AuthenticateContext";
import { useAxios } from "../../../../../providers/AxiosProvider";
import { useEffect, useState } from "react";

interface ICardProject {
  image: string;
  title: string;
  updatedAt: string;
}

// const cardProject: ICardProject[] = [
//   {
//     image:
//       "https://img.freepik.com/psd-gratuitas/fundo-de-banner-de-sexta-feira-negra-com-efeito-de-texto-editavel_47987-11753.jpg?w=2000",
//     title: "Evento de Black Friday",
//     updatedAt: "Atualizado a 3 horas atrás",
//   },
//   {
//     image:
//       "https://magis5.com.br/wp-content/uploads/2020/09/dia-das-criancas-ecommerce-scaled.jpg",
//     title: "Evento dia das crianças",
//     updatedAt: "Atualizado a 3 horas atrás",
//   },
// ];

function Events() {
  const { id } = useAuth();
  const { axiosInstance } = useAxios();
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    getUSerPayload();
    saveCookiesInformationUser();
    totalPrice();
  }, []);

  const getUSerPayload = async () => {
    if (id) {
      const userData = await axiosInstance.get(
        `/common-users-management/${id}`
      );
      setName(userData.data.name);
    }
  };
  const token = localStorage.getItem("c__token");
  const [visits, setVisits] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  const saveCookiesInformationUser = async () => {
    const save = await axiosInstance.get(
      `/security-management/search/all/visits/${id}`
    );

    setVisits(save.data.success);
  };

  let totalOrderPrice: number = 0;

  const totalPrice = async () => {
    const save = await axiosInstance.get(
      `/order-management/get/all/orders/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    save.data.map((order: any) => {
      const { product } = order;
      totalOrderPrice += parseFloat(product.Valor_a_prazo);
      setTotal(totalOrderPrice);
    });
  };

  return (
    <EventsAndProjectsBox>
      <div className="body-dash">
        <h1>Bem vindo, {name}!</h1>
        <p>Aqui vai algumas informações importantes</p>

        <div className="information-admin">
          <h2>
            {" "}
            <strong>{visits}</strong> Visitas na ultima semana!
          </h2>
          <h2>
            <strong>R$ {total.toFixed(2)}</strong> Vendidos essa semana
          </h2>
        </div>
      </div>

      <div className="image-dash">
        <img
          src="https://img.freepik.com/vetores-gratis/ilustracao-do-conceito-de-dados-visuais_114360-2192.jpg?w=826&t=st=1700174746~exp=1700175346~hmac=8adc7c98a8dc401b277de2278152bb898fa923cb41998f4396cfd1f8c0271b0d"
          alt=""
        />
      </div>
    </EventsAndProjectsBox>
  );
}

export default Events;
