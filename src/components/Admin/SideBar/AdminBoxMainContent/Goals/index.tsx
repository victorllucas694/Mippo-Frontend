import { GoalsContainer } from "./styles";
import { useAxios } from "../../../../../providers/AxiosProvider";
import { useState, useEffect } from "react";
import { useAuth } from "../../../../../contexts/AuthenticateContext";

// interface ITableGoals {
//   goalName: string;
//   status: string;
//   progress: string;
//   dueDate: string;
//   team: string;
// }

function Goals() {
  const { axiosInstance } = useAxios();
  const { id } = useAuth();
  const [totalOrders, setTotalOrders] = useState<number>(0);
  useEffect(() => {
    findAllOrders();
  }, [totalOrders]);

  const token = localStorage.getItem("c__token");
  const [totalPriceData, setTotalPriceData] = useState<number>(0);
  let totalPrice: number = 0;

  const findAllOrders = async () => {
    try {
      const foundedAllOrders = await axiosInstance.get(
        `/order-management/get/all/orders/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      foundedAllOrders.data.map((orders: any) => {
        const { product } = orders;

        totalPrice += parseFloat(product.Valor_a_prazo);
      });
      setTotalPriceData(totalPrice);
      setTotalOrders(foundedAllOrders.data.length);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };


  return (
    <GoalsContainer>
      <div className="items-section">
        <div className="item-body">
          <div className="text">
            <h1>Pedidos</h1>
            <h3>
              <strong>{totalOrders}</strong> Pedidos em aberto
            </h3>
            <p>{totalOrders / totalOrders} Pedidos em cancelados</p>
          </div>
          <div className="image">
            <img
              src="https://img.freepik.com/vetores-gratis/ilustracao-do-conceito-de-notas_114360-5640.jpg?w=826&t=st=1703865428~exp=1703866028~hmac=5bba3d12aed546240d06775751641cabc7734bee09d444161633eb46a469946f"
              alt=""
            />
          </div>
        </div>
        <div className="item-body">
          <div className="text">
            <h1>Produtos Vendidos</h1>
            <h3>
              {" "}
              <strong>{0} </strong>Vendas Finalizadas
            </h3>
            <p>{"1980"} Vendas em aberto</p>
          </div>
          <div className="image">
            <img
              src="https://img.freepik.com/vetores-gratis/ilustracao-do-conceito-abstrato-de-venda-personalizada_335657-4457.jpg?w=826&t=st=1700174463~exp=1700175063~hmac=52d47b656808fb3ada72b1dbca29734dac1dd11d099f201180931031ccd0ba1a"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="items-section">
        <div className="item-body">
          <div className="text">
            <h1>Vendas a vista</h1>
            <h3>
              <strong>R$ {totalPriceData.toFixed(2)}</strong> em vendas
            </h3>
            <p>R$ {totalPriceData * 0.98} em lucro</p>
          </div>
          <div className="image">
            <img
              src="https://img.freepik.com/vetores-gratis/ilustracao-do-conceito-de-dados-de-investimento_114360-7373.jpg?w=826&t=st=1700174282~exp=1700174882~hmac=37400ddae78c06f324fb9e563c5abf7fc5fd376a073bfbae74bf4a2d53f341b9"
              alt=""
            />
          </div>
        </div>
        <div className="item-body">
          <div className="text">
            <h1>Custo total de envio</h1>
            <h3>
              {" "}
              <strong>{"R$ 8.090"}</strong> em vendas
            </h3>
            <p>{"R$ 8.099,00"} a pagar</p>
          </div>
          <div className="image">
            <img
              src="https://img.freepik.com/vetores-gratis/icone-de-web-dos-desenhos-animados-de-balanco-processo-contabil-analista-financeiro-ferramentas-de-calculo-ideia-de-consultoria-financeira-servico-de-contabilidade_335657-2313.jpg?w=826&t=st=1700174402~exp=1700175002~hmac=d62c45317ca6df2a9d85f7d420edc1fe8a645b95a8a75a165fd6e8fd07ca2598"
              alt=""
            />
          </div>
        </div>
      </div>
    </GoalsContainer>
  );
}

export default Goals;
