import { SpecificProductsListBoxWrapper } from "./styles";
import * as React from "react";
import { styled } from "@mui/material/styles";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import CardProduct from "../CardProduct";
import { IMockProducts } from "../../../Types";
import { useProductsContext } from "../../../contexts/CardContexts";
import { useAxios } from "../../../providers/AxiosProvider";

interface IGenericListData {
  sliderProductTitle: React.ReactNode;
}

function SpecificProductsList({ sliderProductTitle }: IGenericListData) {
  interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
  }

  const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const [expanded, setExpanded] = React.useState(false);
  const { products } = useProductsContext();
  const [emptyProducts, setEmptyProducts] = React.useState<IMockProducts>({
      "id": 4,
      "Marca": "Adicionar",
      "Fabricante": "Voce não possui produtos",
      "Formato": "",
      "Marca_do_processador": "Intel",
      "Tipo_de_processador": "",
      "Velocidade_do_processador": "4.0 GHz",
      "Tipo_de_soquete_do_processador": "LGA 1200",
      "Numero_de_processadores": "4",
      "Tamanho_da_memoria": "32 GB",
      "Tecnologia_da_memoria": "DDR4",
      "Tipo_de_Memoria": "DDR4 SDRAM",
      "Tamanho_do_HD": "1.5 TB",
      "Tecnologia_do_HD": "SSD",
      "Interface_do_HD": "NVMe",
      "Marca_do_chipset_de_video": "NVIDIA",
      "Descricao_da_placa_de_video": "NVIDIA GeForce RTX 3080",
      "Tipo_de_conexao": "Wi-Fi",
      "Tecnologia_de_conexao": "Bluetooth",
      "Plataforma_de_hardware": "PC",
      "Sistema_operacional": "Windows 11",
      "Peso_do_produto": "11 Kilograms",
      "Dimensoes_da_embalagem": "60 x 58 x 35 cm",
      "Codigo": "C123123",
      "Fornecedor": "Thelema",
      "Quantidade_em_estoque": 8,
      "User_Id": 1,      "Codigo_das_Imagens": "D456456",
      "Dimensoes_do_pacote": "60 x 58 x 35 centímetros",
      "Descricao_final_sobre_o_produto": "Adicione Produtos a sua plataforma e será exibido aqui",
      "Valor_a_vista": "R$ 00,00",
      "Valor_a_prazo": "R$ 00,00",
  })
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 8; 
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };
  let totalPages;
  let productsToShow;

  if (products) {
    totalPages = Math.ceil(products.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    productsToShow = products.slice(startIndex, endIndex);
  }

  return (
    <SpecificProductsListBoxWrapper>
      <div className="body-product">
        { products ? productsToShow?.map((productsList: IMockProducts) => {
          return <CardProduct productsList={productsList}/>;
        }) : <CardProduct productsList={emptyProducts}/>}
      </div>
    </SpecificProductsListBoxWrapper>
  );
}

export default SpecificProductsList;
