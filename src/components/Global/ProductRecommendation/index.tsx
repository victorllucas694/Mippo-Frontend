import React from "react";
import { IMockProducts } from "../../../Types";
import CardProduct from "../CardProduct";
import { SpecificProductsListBoxWrapper } from "../SpecificProductsList/styles";
import { ProductRecommendationContainer } from "./styles";
import { useAxios } from "../../../providers/AxiosProvider";
import { useEffect, useState } from "react";

function ProductRecommendation() {
  // const [emptyProducts, setEmptyProducts] = React.useState<IMockProducts>({
  //   id: 4,
  //   Marca: "Adicionar",
  //   Fabricante: "Voce não possui produtos",
  //   Formato: "",
  //   Marca_do_processador: "Intel",
  //   Tipo_de_processador: "",
  //   Velocidade_do_processador: "4.0 GHz",
  //   Tipo_de_soquete_do_processador: "LGA 1200",
  //   Numero_de_processadores: "4",
  //   Tamanho_da_memoria: "32 GB",
  //   Tecnologia_da_memoria: "DDR4",
  //   Tipo_de_Memoria: "DDR4 SDRAM",
  //   Tamanho_do_HD: "1.5 TB",
  //   Tecnologia_do_HD: "SSD",
  //   Interface_do_HD: "NVMe",
  //   Marca_do_chipset_de_video: "NVIDIA",
  //   Descricao_da_placa_de_video: "NVIDIA GeForce RTX 3080",
  //   Tipo_de_conexao: "Wi-Fi",
  //   Tecnologia_de_conexao: "Bluetooth",
  //   Plataforma_de_hardware: "PC",
  //   Sistema_operacional: "Windows 11",
  //   Peso_do_produto: "11 Kilograms",
  //   Dimensoes_da_embalagem: "60 x 58 x 35 cm",
  //   Codigo: "C123123",
  //   Fornecedor: "Thelema",
  //   Quantidade_em_estoque: 8,
  //   User_Id: 1,
  //   Codigo_das_Imagens: "D456456",
  //   Dimensoes_do_pacote: "60 x 58 x 35 centímetros",
  //   Descricao_final_sobre_o_produto:
  //     "Adicione Produtos a sua plataforma e será exibido aqui",
  //   Valor_a_vista: "R$ 00,00",
  //   Valor_a_prazo: "R$ 00,00",
  // });

  const { axiosInstance } = useAxios();
  const [productsRecommendation, setProductsRecommendation] = useState<
    IMockProducts[] | null
  >(null);

  useEffect(() => {
    const currentURL = window.location.pathname;
    const urlParts = currentURL.split("/");
    const category = urlParts[2];
    getProductsByRecommendation(category);
  }, [axiosInstance]);


  const getProductsByRecommendation = async (category: string) => {
    const token = localStorage.getItem("c__token");
    const reqByGetProducts = await axiosInstance.get(
      `/products-management-without-auth/get/recommendation/${category}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (reqByGetProducts.data) {
      const limitedData = reqByGetProducts.data.slice(0, 4);
      setProductsRecommendation(limitedData);
    }

    console.log("productsRecommendation", productsRecommendation);
  };

  return (
    <ProductRecommendationContainer>
      <SpecificProductsListBoxWrapper>
        <div className="body-product">
          {productsRecommendation?.map((products: IMockProducts) => {
            return <CardProduct productsList={products} />;
          })}
        </div>
      </SpecificProductsListBoxWrapper>
    </ProductRecommendationContainer>
  );
}

export default ProductRecommendation;
