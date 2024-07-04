import { SpecificProductsListBoxWrapper } from "./styles";
import * as React from "react";
import CardProduct from "../CardProduct";
import { IMockProducts } from "../../../Types";
import { useProductsContext } from "../../../contexts/CardContexts";

interface IGenericListData {
  sliderProductTitle: React.ReactNode;
}

function SpecificProductsList({ sliderProductTitle }: IGenericListData) {
  console.log(sliderProductTitle);

  const { products } = useProductsContext();
  const [emptyProducts, __setEmptyProducts] = React.useState<IMockProducts>({
    id: 4,
    Marca: "Adicionar",
    Fabricante: "Voce não possui produtos",
    Formato: "N/A",
    Marca_do_processador: "N/A",
    Tipo_de_processador: "N/A",
    Velocidade_do_processador: "N/A",
    Tipo_de_soquete_do_processador: "N/A",
    Numero_de_processadores: "N/A",
    Tamanho_da_memoria: "N/A",
    Tecnologia_da_memoria: "N/A",
    Tipo_de_Memoria: "N/A",
    Tamanho_do_HD: "N/A",
    Tecnologia_do_HD: "N/A",
    Interface_do_HD: "N/A",
    Marca_do_chipset_de_video: "N/A",
    Descricao_da_placa_de_video: "N/A",
    Tipo_de_conexao: "N/A",
    Tecnologia_de_conexao: "N/A",
    Plataforma_de_hardware: "N/A",
    Sistema_operacional: "N/A",
    Peso_do_produto: "N/A",
    Dimensoes_da_embalagem: "N/A",
    Codigo: "N/A",
    Fornecedor: "N/A",
    Quantidade_em_estoque: 0,
    User_Id: 1,
    Codigo_das_Imagens: "N/A",
    Dimensoes_do_pacote: "N/A",
    Descricao_final_sobre_o_produto:
      "Adicione Produtos a sua plataforma e será exibido aqui",
    Valor_a_vista: "R$ 00,00",
    Valor_a_prazo: "R$ 00,00",
  });
  const [currentPage, __setCurrentPage] = React.useState(1);
  const itemsPerPage = 8;
  let productsToShow;

  if (products) {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    productsToShow = products.slice(startIndex, endIndex);
  }

  return (
    <SpecificProductsListBoxWrapper>
      <div className="body-product">
        {products ? (
          productsToShow?.map((productsList: IMockProducts) => {
            return <CardProduct productsList={productsList} />;
          })
        ) : (
          <>
            <CardProduct productsList={emptyProducts} />
            <CardProduct productsList={emptyProducts} />
            <CardProduct productsList={emptyProducts} />
            <CardProduct productsList={emptyProducts} />
          </>
        )}
      </div>
    </SpecificProductsListBoxWrapper>
  );
}

export default SpecificProductsList;
