import { useState } from "react";
import Header from "../../components/Global/Header";
import OptionsHeader from "../../components/Global/OptionsPanel";
import SearchPanel from "../../components/Global/SearchPanel";
import LoginPage from "../../components/LoginPage";
import Footer from "../../components/Global/Footer";

function Login({setUserAllowed}: any) {
  const [headerComment, setHeaderComment] = useState(
    "Código da sorte: AQFO1KJ"
  );
  const [breadcrumb, setBreadcrumb] = useState(
    "Faça o seu login ou registre uma conta caso ainda não possua nenhum cadastro"
  );

  const [loginBoxLabel, setLoginBoxLabel] = useState(
    "Já tenho uma conta"
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

  return (
    <>
      <Header
        headerInitial={headerComment}
        buttonsTopHeaderData={buttonsTopHeaderData}
      />
      <SearchPanel searchPanelDataPreset={searchPanelDataPreset} />
      <OptionsHeader categoriesBoxProps={categoriesBoxProps} />
      <LoginPage breadcrumb={breadcrumb} loginBoxLabel={loginBoxLabel} registerBoxLabel={'Registro'}  />
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </>
  );
}

export default Login;
