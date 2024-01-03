import ProductDescriptionPage from "../../components/ProductDescriptionPage";
import { useState, useEffect } from "react";
import Header from "../../components/Global/Header";
import OptionsHeader from "../../components/Global/OptionsPanel";
import SearchPanel from "../../components/Global/SearchPanel";
import ProductDescriptionPresentation from "../../components/ProductDescriptionPage/ProductDescriptionPresentation";
import ProductDescriptionDetails from "../../components/ProductDescriptionPage/ProductDescriptionDetails";
import { useNavigate, useParams } from "react-router-dom";
import { useAxios } from "../../providers/AxiosProvider";
import { useRequestsProductsContext } from "../../contexts/RequestsProductsContext";
import axiosInstance from "../../providers/AxiosInstance";
import GridBannersData from "../../components/HomePage/GridBannersData";
import ProductsFirstSection from "../../components/HomePage/ProductsFirstSection";
import SpecificProductsList from "../../components/Global/SpecificProductsList";
import ProductDetails from "../../components/ProductDescriptionPage/ProductDetails";
import ProductRecommendation from "../../components/Global/ProductRecommendation";
import Footer from "../../components/Global/Footer";

function ProductDescription() {
  const [headerComment, setHeaderComment] = useState(
    "Código da sorte: AQFO1KJ"
  );

  const buttonsTopHeaderData = [
    {
      id: 1,
      label: "Entrar",
    },
    {
      id: 2,
      label: "Registre-se",
    },
  ];

  const searchPanelDataPreset = [
    {
      id: 1,
      image: "",
    },
    {
      id: 2,
      label: "search",
    },
    {
      id: 3,
      image: "",
      label: "",
      contact: "",
    },
  ];

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
      id: 4,
      label: "Área gamer",
    },
    {
      id: 5,
      label: "Hardware",
    },
    {
      id: 4,
      label: "Computadores",
    },
    {
      id: 5,
      label: "Softwares",
    },
  ];

  const navigate = useNavigate();
  const currentURL = window.location.pathname;
  const [sliderProductTitle, setSliderProductTitle] = useState<any>(
    "Smartphones e telefones"
  );
  useEffect(() => {
    getProductSelected();
  }, []);

  const urlParts = currentURL.split("/");

  const category = urlParts[2];
  const productCode = urlParts[3];
  const productId = urlParts[4];


  const { setterProductSelected, productSelected } = useRequestsProductsContext();

  const getProductSelected = async () => {
    const token = localStorage.getItem("c__token");
    const foundedProduct = await axiosInstance.get(
      `products-management-without-auth/get/product/${category}/${productCode}/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setterProductSelected(foundedProduct.data)
    
  };


  const [similarProductsTitle, setProductsTitle] = useState<string>("Talvez você goste desses produtos")

  return (
    <>
      <Header
        headerInitial={headerComment}
        buttonsTopHeaderData={buttonsTopHeaderData}
      />
      <SearchPanel searchPanelDataPreset={searchPanelDataPreset} />
      <OptionsHeader categoriesBoxProps={categoriesBoxProps} />
      <ProductDescriptionPage categoryBySearchProductPage={null} />
      <ProductDescriptionPresentation />
      <ProductDetails product={productSelected}/>
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
