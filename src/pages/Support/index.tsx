import { SupportRootContainer } from "./styles";
import Header from "../../components/Global/Header";
import SearchPanel from "../../components/Global/SearchPanel";
import OptionsHeader from "../../components/Global/OptionsPanel";

function Support() {
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

  return (
    <>
      <SupportRootContainer>
        <Header
        />
        <SearchPanel/>
        <OptionsHeader categoriesBoxProps={categoriesBoxProps} />
      </SupportRootContainer>
    </>
  );
}

export default Support;
