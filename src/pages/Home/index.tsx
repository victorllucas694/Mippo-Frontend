import React, { useEffect } from "react";
import Header from "../../components/Global/Header";
import SearchPanel from "../../components/Global/SearchPanel";
import OptionsHeader from "../../components/Global/OptionsPanel";
import FeaturedBanner from "../../components/HomePage/FeaturedBanner";
import SpecificProductsList from "../../components/Global/SpecificProductsList";
import { useState } from "react";
import ProductsFirstSection from "../../components/HomePage/ProductsFirstSection";
import GridBannersData from "../../components/HomePage/GridBannersData";
import Footer from "../../components/Global/Footer";
import { useAxios } from "../../providers/AxiosProvider";
import { usePagesManagement } from "../../contexts/PagesManagementContext";
import CardProduct from "../../components/Global/CardProduct";
import { ProductsFiltred } from "./styles";

function HomePage() {
  const [sliderProductTitle, __setSliderProductTitle] = useState<any>(
    "Smartphones e telefones"
  );

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

  const [gamerProductsTitle, __setGamerProductsTitle] =
    useState<string>("Computadores");
  const [notebookProductsTitle, __setNotebookProductsTitle] = useState<string>(
    "Computadores para trabalho e jogos"
  );

  useEffect(() => {
    saveCookiesInformationUser();
  }, []);

  const { axiosInstance } = useAxios();

  const saveCookiesInformationUser = async () => {
    const save = await axiosInstance.get(
      "/security-management/cookies/CookiesAllowed"
    );

    console.log(save.data.saveAdvancedUserInfoBySecurity);
  };

  
  const { PageData } = usePagesManagement();
  console.log(PageData);

  return (

    <React.Fragment>
      <Header />
      <SearchPanel />
      <OptionsHeader categoriesBoxProps={categoriesBoxProps} />
      {PageData.length > 0 ? (
        <>        
        <ProductsFiltred>
          {PageData.map((pro) => {
            return <CardProduct productsList={pro} />;
          })}
        </ProductsFiltred>
        <Footer />
        </>
      ) : (
        <>
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
        </>
      )}
    </React.Fragment>
  );
}

export default HomePage;
