import { useState, useEffect } from "react";
import Header from "../../components/Global/Header";
import SearchPanel from "../../components/Global/SearchPanel";
import PaymentProduct from "../../components/Payment";
import OptionsHeader from "../../components/Global/OptionsPanel";
import Checkout from "./Checkout";
import Footer from "../../components/Global/Footer";

function Payment() {
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
  return (
    <>
      <Header
        headerInitial={headerComment}
        buttonsTopHeaderData={buttonsTopHeaderData}
      />
      <SearchPanel searchPanelDataPreset={searchPanelDataPreset} />
      <OptionsHeader categoriesBoxProps={categoriesBoxProps} />
      <Checkout />
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </>
  );
}

export default Payment;
