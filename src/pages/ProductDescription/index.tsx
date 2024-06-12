import ProductDescriptionPage from "../../components/ProductDescriptionPage";
import { useState, useEffect } from "react";
import Header from "../../components/Global/Header";
import OptionsHeader from "../../components/Global/OptionsPanel";
import SearchPanel from "../../components/Global/SearchPanel";
import ProductDescriptionPresentation from "../../components/ProductDescriptionPage/ProductDescriptionPresentation";
import { useRequestsProductsContext } from "../../contexts/RequestsProductsContext";
import axiosInstance from "../../providers/AxiosInstance";
import ProductsFirstSection from "../../components/HomePage/ProductsFirstSection";
import ProductDetails from "../../components/ProductDescriptionPage/ProductDetails";
import ProductRecommendation from "../../components/Global/ProductRecommendation";
import Footer from "../../components/Global/Footer";

function ProductDescription() {
  const categoriesBoxProps = [
    {
      id: 1,
      label: "Departamentos gerais",
    },
    {
      id: 2,
      label: "Notebook",
    },
    {
      id: 3,
      label: "Acessorios",
    },
    {
      id: 5,
      label: "Hardware",
    },
    {
      id: 4,
      label: "Computadores",
    },
  ];

  const currentURL = window.location.pathname;
  useEffect(() => {
    getProductSelected();
  }, []);

  const urlParts = currentURL.split("/");

  const category = urlParts[2];
  const productCode = urlParts[3];
  const productId = urlParts[4];

  const { setterProductSelected, productSelected } =
    useRequestsProductsContext();

  const getProductSelected = async () => {
    const token = localStorage.getItem("c__token");
    const foundedProduct = await axiosInstance.get(
      `products-management-without-auth/get/product/${category}/${productCode}/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setterProductSelected(foundedProduct.data);
  };

  const [similarProductsTitle] = useState<string>(
    "Talvez você goste desses produtos"
  );

  return (
    <>
      <Header />
      <SearchPanel />
      <OptionsHeader categoriesBoxProps={categoriesBoxProps} />
      <ProductDescriptionPage categoryBySearchProductPage={null} />
      <ProductDescriptionPresentation />
      <ProductDetails product={productSelected} />
      <ProductsFirstSection label={similarProductsTitle} />
      <ProductRecommendation />
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </>
  );
}

export default ProductDescription;
