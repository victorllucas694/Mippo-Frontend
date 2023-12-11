import { useEffect } from "react";
import { AlertStockTable } from "./styles";
import { useAxios } from "../../../providers/AxiosProvider";
import { useAuth } from "../../../contexts/AuthenticateContext";

function AlertLowerStock() {
  const { axiosInstance } = useAxios();
  const { id } = useAuth();
  const token = localStorage.getItem("c__token");

  useEffect(() => {
    getStockProduct();
  }, []);

  async function getStockProduct() {
    const reqDataAllProducts = await axiosInstance.get(
      `/order-management/get/alert/total/stock/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const {
      dataComputerProduct,
      dataNotebookProduct,
      dataAcessoriesProduct,
      dataHardwareProduct,
    } = reqDataAllProducts.data;

    dataComputerProduct.map((computer: any) => {
        if(computer.Quantidade_em_estoque < 10) {
          console.log(computer)
          console.log(computer.Quantidade_em_estoque)
        }
      })
      dataNotebookProduct.map((computer: any) => {
        if(computer.Quantidade_em_estoque < 10) {
          console.log(computer)
          console.log(computer.Quantidade_em_estoque)
        }
      })

      dataAcessoriesProduct.map((computer: any) => {
        if(computer.Quantidade_em_estoque < 10) {
          console.log(computer)
          console.log(computer.Quantidade_em_estoque)
        }
      })

      dataHardwareProduct.map((computer: any) => {
        if(computer.Quantidade_em_estoque < 10) {
          console.log(computer)
          console.log(computer.Quantidade_em_estoque)
        }
      })

    console.log(
      dataComputerProduct,
      dataNotebookProduct,
      dataAcessoriesProduct,
      dataHardwareProduct
    );
  }

  return <AlertStockTable></AlertStockTable>;
}

export default AlertLowerStock;
