import { useState } from "react";
import Header from "../../components/Global/Header";
import OptionsHeader from "../../components/Global/OptionsPanel";
import SearchPanel from "../../components/Global/SearchPanel";
import LoginPage from "../../components/LoginPage";
import Footer from "../../components/Global/Footer";

function Login() {
  
  const [breadcrumb, __setBreadcrumb] = useState(
    "Faça o seu login ou registre uma conta caso ainda não possua nenhum cadastro"
  );

  const [loginBoxLabel, __setLoginBoxLabel] = useState(
    "Já tenho uma conta"
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
    }
  ];

  return (
    <>
      <Header
      />
      <SearchPanel />
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
