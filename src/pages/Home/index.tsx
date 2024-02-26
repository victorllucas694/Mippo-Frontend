import React, { useEffect } from "react";
import Header from "../../components/Global/Header";
import SearchPanel from "../../components/Global/SearchPanel";
import OptionsHeader from "../../components/Global/OptionsPanel";
import FeaturedBanner from "../../components/HomePage/FeaturedBanner";
import SpecificProductsList from "../../components/Global/SpecificProductsList";
import { useState } from "react";
import { IMockProducts } from "../../Types";
import { useProductsContext } from "../../contexts/CardContexts";
import AddCupom from "../../components/HomePage/AddCupom";
import ProductsFirstSection from "../../components/HomePage/ProductsFirstSection";
import GridBannersData from "../../components/HomePage/GridBannersData";
import { TableFooter } from "@mui/material";
import Footer from "../../components/Global/Footer";
import { useAxios } from "../../providers/AxiosProvider";

function HomePage() {
  const [sliderProductTitle, setSliderProductTitle] = useState<any>(
    "Smartphones e telefones"
  );
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

  const { products } = useProductsContext();
  const [gamerProductsTitle, setGamerProductsTitle] =
    useState<string>("Computadores");
  const [notebookProductsTitle, setNotebookProductsTitle] = useState<string>(
    "Computadores para trabalho e jogos"
  );

  const [pageCategory, setPageCategory] = useState<string>("");

  useEffect(() => {
    getProductsByCategory();
    saveCookiesInformationUser();
  }, []);

  const getProductsByCategory = async () => {
    const currentURL = window.location.pathname;
    const urlParts = currentURL.split("/");
    const category = urlParts[1];
  };

  const { axiosInstance } = useAxios();

  const saveCookiesInformationUser = async () => {
    const save = await axiosInstance.get(
      "/security-management/cookies/CookiesAllowed"
    );

    console.log(save.data.saveAdvancedUserInfoBySecurity);
  };

  return (
    <React.Fragment>
      <Header
        headerInitial={headerComment}
        buttonsTopHeaderData={buttonsTopHeaderData}
      />
      <SearchPanel/>
      <OptionsHeader categoriesBoxProps={categoriesBoxProps} />
      <FeaturedBanner />
      <ProductsFirstSection label={gamerProductsTitle} />
      <SpecificProductsList sliderProductTitle={sliderProductTitle} />
      <GridBannersData />
      <ProductsFirstSection label={notebookProductsTitle} />
      <SpecificProductsList sliderProductTitle={sliderProductTitle} />
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </React.Fragment>
  );
}

export default HomePage;
