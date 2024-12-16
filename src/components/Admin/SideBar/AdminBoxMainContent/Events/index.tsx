import { EventsAndProjectsBox } from "./styles";
import { useAuth } from "../../../../../contexts/AuthenticateContext";
import { useAxios } from "../../../../../providers/AxiosProvider";
import { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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

  const totalPrice = async () => {
    const save = await axiosInstance.get(
      `/order-management/get/all/orders/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("save", save);

    let totalOrderPrice = 0;

    save.data.forEach((order: any) => {
      const { product } = order;
      totalOrderPrice += parseFloat(product.Valor_a_prazo);
    });

    setTotal(totalOrderPrice);
  };

  return (
    <EventsAndProjectsBox>
      <div className="body-dash">
        <h1>Bem vindo, <span style={{ color: '#4e97fd', fontFamily: 'Roboto' }}>{name}</span></h1>
        <p>Aqui vai algumas informações importantes</p>

        <div className="information-admin">
          <h2>
            {" "}
            <strong>{visits}</strong> Visitas na ultima semana!
          </h2>
          <h2>
            <strong>
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(total)}
            </strong>{" "}
            Vendidos essa semana
          </h2>
        </div>
      </div>

      <div className="image-dash">
        <img
          src="https://img.freepik.com/vetores-gratis/ilustracao-do-conceito-do-metodo-kanban_114360-13016.jpg?t=st=1734295231~exp=1734298831~hmac=cd7f83c27c402f0e26ab12f32820bf84cea61f6efb315ed7c017b946bf49bcf0&w=826"
          alt=""
        />
      </div>
    </EventsAndProjectsBox>
  );
}

export default Events;
