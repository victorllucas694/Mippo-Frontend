import { useEffect, useState } from "react";
import Header from "../../components/Global/Header";
import OptionsHeader from "../../components/Global/OptionsPanel";
import SearchPanel from "../../components/Global/SearchPanel";
import ProductDescriptionPage from "../../components/ProductDescriptionPage";
import GeneralFunction from "../../components/Admin/GeneralProducts";
import { useRequestsProductsContext } from "../../contexts/RequestsProductsContext";
import { Alert, Snackbar } from "@mui/material";
import Footer from "../../components/Global/Footer";

function ProductByCategory() {
  useEffect(() => {
    getURLCategory();
  }, []);

  const [categoryBySearchProductPage, setCategoryBySearchProductPage] =
    useState<string | null>(null);
  const currentURL = window.location.pathname;
  const getURLCategory = () => {
    const urlParts = currentURL.split("/");
    const category = urlParts[1];

    setCategoryBySearchProductPage(category);
  };

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
      id: 6,
      label: "Computadores",
    },
  ];

  const { alertlogin } = useRequestsProductsContext();
  console.log(alertlogin);

  const { stock } = useRequestsProductsContext();
  console.log(alertlogin)
  
  return (
    <>
      <Header />
      <SearchPanel />
      <OptionsHeader categoriesBoxProps={categoriesBoxProps} />
      <ProductDescriptionPage
        categoryBySearchProductPage={categoryBySearchProductPage}
      />
      <GeneralFunction />
        <Snackbar open={stock} autoHideDuration={6000}>
        <Alert
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Erro: Esse produto está esgotado
        </Alert>
      </Snackbar>

      <br />
      <br />
      <br />
      <br />
      <Footer />
    </>
  );
}

export default ProductByCategory;
