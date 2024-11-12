// CircleChart.tsx
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { ChartData, ChartOptions } from "chart.js";
import { useAxios } from "../../../../providers/AxiosProvider";
import { useAuth } from "../../../../contexts/AuthenticateContext";

ChartJS.register(ArcElement, Tooltip, Legend);

const CircleChart: React.FC = () => {
  const { axiosInstance } = useAxios();
  const { id } = useAuth();
  const token = localStorage.getItem("c__token");

  useEffect(() => {
    getStockProduct();
  }, []);

  const [orders, setOrders] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  async function getStockProduct() {
    try {
      const reqDataAllProducts = await axiosInstance.get(
        `/order-management/get/user/orders/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      setOrders(reqDataAllProducts.data.length);
      console.log("reqDataAllProducts", reqDataAllProducts);
  
      const totalValueSum = reqDataAllProducts.data.reduce((acc: number, products: any) => {
        const { product } = products;
        const totalValue = parseInt(product.Valor_a_prazo, 10);
        return acc + totalValue;
      }, 0);
  
      
      setTotalPrice(totalValueSum);
      console.log(totalPrice)
  
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }

  const data: ChartData<"doughnut"> = {
    labels: ["Itens no Carrinho", "Compras Pendentes"],
    datasets: [
      {
        label: "Informações de Compras",
        data: [orders, orders],
        backgroundColor: ["#0d6efd", "#6c757d", "#c8c8c8"],
        borderColor: ["#0d6efd", "#6c757d", "#c8c8c8"],
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    cutout: "70%",
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.label || "";
            if (label) {
              label += ": ";
            }
            label += context.raw + "";
            return label;
          },
        },
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default CircleChart;
