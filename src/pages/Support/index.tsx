import { SupportRootContainer } from "./styles";
import { useState, useEffect } from "react";
import Header from "../../components/Global/Header";
import SearchPanel from "../../components/Global/SearchPanel";
import OptionsHeader from "../../components/Global/OptionsPanel";

function Support() {
  const [ headerComment ] = useState(
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
      <SupportRootContainer>
        <Header
          headerInitial={headerComment}
          buttonsTopHeaderData={buttonsTopHeaderData}
        />
        <SearchPanel searchPanelDataPreset={searchPanelDataPreset} />
        <OptionsHeader categoriesBoxProps={categoriesBoxProps} />
      </SupportRootContainer>
    </>
  );
}

export default Support;
