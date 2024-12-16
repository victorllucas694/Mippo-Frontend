import { IMockProducts } from "../../../Types";
import CardProduct from "../CardProduct";
import { SpecificProductsListBoxWrapper } from "../SpecificProductsList/styles";
import { ProductRecommendationContainer } from "./styles";
import { useAxios } from "../../../providers/AxiosProvider";
import { useEffect, useState } from "react";

function ProductRecommendation() {
  const { axiosInstance } = useAxios();
  const [productsRecommendation, setProductsRecommendation] = useState<
    IMockProducts[] | null
  >(null);

  useEffect(() => {
    const currentURL = window.location.pathname;
    const urlParts = currentURL.split("/");
    const category = urlParts[2];
    getProductsByRecommendation(category);
  }, [axiosInstance]);


  const getProductsByRecommendation = async (category: string) => {
    const token = localStorage.getItem("c__token");
    const reqByGetProducts = await axiosInstance.get(
      `/products-management-without-auth/get/recommendation/${category}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (reqByGetProducts.data) {
      const limitedData = reqByGetProducts.data.slice(0, 3);
      setProductsRecommendation(limitedData);
    }

    console.log("productsRecommendation", productsRecommendation);
  };

  return (
    <ProductRecommendationContainer>
      <SpecificProductsListBoxWrapper>
        <div className="body-product">
          {productsRecommendation?.map((products: IMockProducts) => {
            return <CardProduct productsList={products} />;
          })}
        </div>
      </SpecificProductsListBoxWrapper>
    </ProductRecommendationContainer>
  );
}

export default ProductRecommendation;
