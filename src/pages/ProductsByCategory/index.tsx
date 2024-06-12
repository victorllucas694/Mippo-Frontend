import { useEffect, useState } from "react";
import Header from "../../components/Global/Header";
import OptionsHeader from "../../components/Global/OptionsPanel";
import SearchPanel from "../../components/Global/SearchPanel";
import ProductDescriptionPage from "../../components/ProductDescriptionPage";
import GeneralFunction from "../../components/Admin/GeneralProducts";
import { useRequestsProductsContext } from "../../contexts/RequestsProductsContext";
import { Alert, Snackbar } from "@mui/material";
import * as React from "react";
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

  const { created, alertlogin } =
    useRequestsProductsContext();
  console.log(alertlogin);


  const handleClose = (
    __event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
  };

  return (
    <>
      <Header
      />
      <SearchPanel />
      <OptionsHeader categoriesBoxProps={categoriesBoxProps} />
      <ProductDescriptionPage
        categoryBySearchProductPage={categoryBySearchProductPage}
      />
      <GeneralFunction />

      {created ? (
        <Snackbar open={created} autoHideDuration={500} onClose={handleClose}>
          <Alert
            severity="success"
            onClose={handleClose}
            sx={{ width: "100%" }}
          >
            Produto adicionado ao carrinho
          </Alert>
        </Snackbar>
      ) : null}

      {alertlogin ? (
        <Snackbar open={true} autoHideDuration={500} onClose={handleClose}>
          <Alert severity="error" onClose={handleClose} sx={{ width: "100%" }}>
            Erro ao adicionar Produto ao carrinho
          </Alert>
        </Snackbar>
      ) : null}

      <br />
      <br />
      <br />
      <br />
      <Footer />
    </>
  );
}

export default ProductByCategory;
