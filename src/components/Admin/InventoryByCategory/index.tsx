import { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthenticateContext";
import { useAxios } from "../../../providers/AxiosProvider";
import InventoryTable from "./InventoryTable";

interface Inventary {
  productName: string;
  pageName: string;
}

function InventaryByCategory({ productName }: Inventary) {
  const { axiosInstance } = useAxios();
  const { id } = useAuth();
  const token = localStorage.getItem("c__token");
  const [invetoryProducts, setInventoryProducts] = useState<any[]>([]);

  

  useEffect(() => {
    getAllProductsByCategory();
  }, [axiosInstance, id, productName]);


  const getAllProductsByCategory = async () => {
    const foundedProducts = await axiosInstance.get(
      `/inventary-management/get/all/itens/${id}/${productName}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setInventoryProducts(foundedProducts.data);
  };

  return (
    <>
      {productName ? (
        <InventoryTable invetoryProducts={invetoryProducts} />
      ) : (
        <h1>Você não tem produtos nessa categoria</h1>
      )}
    </>
  );
}

export default InventaryByCategory;
