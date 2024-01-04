import { useEffect, useState } from "react";
import Header from "../../components/Global/Header";
import OptionsHeader from "../../components/Global/OptionsPanel";
import SearchPanel from "../../components/Global/SearchPanel";
import ProductDescriptionPresentation from "../../components/ProductDescriptionPage/ProductDescriptionPresentation";
import ProductDescriptionPage from "../../components/ProductDescriptionPage";
import GeneralFunction from "../../components/Admin/GeneralProducts";
import { useRequestsProductsContext } from "../../contexts/RequestsProductsContext";
import { Alert, Pagination, Snackbar } from "@mui/material";
import * as React from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
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
  const [headerComment, setHeaderComment] = useState(
    "Código da sorte: AQFO1KJ"
  );
  const [breadcrumb, setBreadcrumb] = useState(
    "Faça o seu login ou registre uma conta caso ainda não possua nenhum cadastro"
  );

  const [loginBoxLabel, setLoginBoxLabel] = useState("Já tenho uma conta");

  const [registerBoxLabel, setRegisterBoxLabel] = useState(
    "Ainda não tenho uma conta"
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
      id: 6,
      label: "Computadores",
    },
    {
      id: 7,
      label: "Softwares",
    },
  ];

  const { created, alertlogin, searchInput } =
    useRequestsProductsContext();
  const [closed, setClosed] = useState<boolean>(true);
  const [open, setOpen] = useState(false);
  console.log(alertlogin);

  const handleClick = () => {
    setOpen(true);
    console.log(open, closed)
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
      console.log(event)
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="success" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const getProductsByCategory = async () => {
    const currentURL = window.location.pathname;
    const urlParts = currentURL.split("/");
    const category = urlParts[1];

    console.log(searchInput);
  };

  return (
    <>
      <Header
        headerInitial={headerComment}
        buttonsTopHeaderData={buttonsTopHeaderData}
      />
      <SearchPanel searchPanelDataPreset={searchPanelDataPreset} />
      <OptionsHeader categoriesBoxProps={categoriesBoxProps} />
      <ProductDescriptionPage
        categoryBySearchProductPage={categoryBySearchProductPage}
      />
      <GeneralFunction
        categoryBySearchProductPage={categoryBySearchProductPage}
      />
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
