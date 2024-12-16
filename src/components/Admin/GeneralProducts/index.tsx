import { Pagination } from "@mui/material";
import { useRequestsProductsContext } from "../../../contexts/RequestsProductsContext";
import { MainComponentOnPage } from "./styles";
import { useEffect, useState } from "react";
import { useProductsContext } from "../../../contexts/CardContexts";
import { IMockProducts } from "../../../Types";
import CardProduct from "../../Global/CardProduct";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";

export interface Category {
  name: string;
  subcategories: Subcategories[];
}

export interface Subcategories {
  name: string;
  valor: SubcategoriaData[];
}

export interface SubcategoriaData {
  label: string;
}

function GeneralFunction() {
  const categoryMap: Record<string, () => JSX.Element> = {
    Computadores: handleComputadores,
    Notebook: handleNotebooks,
    Acessorios: handleAcessorios,
    Hardware: HandleHardware,
  };

  const {
    computerCategory,
    accessoriesCategory,
    HardwareDataCategory,
    NotebookDataCategory,
  } = useRequestsProductsContext();

  const { products } = useProductsContext();

  const [contentToRender, setContentToRender] = useState<JSX.Element | null>(
    null
  );
  const [category, setCategory] = useState<string | null>("");
  // const { PageData } = usePagesManagement();
  console.log(category);
  useEffect(() => {
    const category = getCategory();
    setCategory(category);
  }, [products]);

  function getCategory(): string {
    const currentURL = window.location.pathname;
    const urlParts = currentURL.split("/");
    const category = urlParts[1];
    setCategory(category);

    if (categoryMap.hasOwnProperty(category)) {
      const content = categoryMap[category]();
      setContentToRender(content);
    }
    return category;
  }

  // const { axiosInstance } = useAxios();

  const handleCheckboxComputerChange = async (value: string) => {
    console.log(value);
    console.log(products);

    const matchingProducts = products?.filter(
      (product) =>
        product.Marca_do_processador === value ||
        product.Tecnologia_da_memoria === value ||
        product.Tipo_de_conexao === value ||
        product.Sistema_operacional.includes(value) ||
        product.Marca_do_chipset_de_video.includes(value)
    );

    if (matchingProducts !== undefined && matchingProducts.length > 0) {
      setFilteredProducts(matchingProducts);
      console.log("Produtos encontrados:", matchingProducts);
    } else {
      setFilteredProducts([]);
    }
  };
  const [filteredProducts, setFilteredProducts] = useState<
    IMockProducts[] | null
  >(null);
  // const [checkboxStates, setCheckboxStates] = useState<{
  //   [subcategory: string]: { [value: string]: boolean };
  // }>({});
  // console.log(checkboxStates);

  const handleCheckboxNotebookChange = async (value: string) => {
    console.log(value);
    console.log(products);

    const matchingProducts = products?.filter(
      (product) =>
        product.Marca_do_processador === value ||
        product.Tecnologia_da_memoria === value ||
        product.Tipo_de_conexao === value ||
        product.Sistema_operacional === value ||
        product.Marca_do_chipset_de_video === value
    );

    if (matchingProducts !== undefined && matchingProducts.length > 0) {
      setFilteredProducts(matchingProducts);
    } else {
      setFilteredProducts([]);
    }
  };

  const handleCheckboxHardwareChange = async (value: string) => {
    console.log(value);
    console.log(products);

    const matchingProducts = products?.filter(
      (product) =>
        product.Fabricante === value ||
        product.Marca.includes(value) ||
        product.Tipo_de_Hardware === value ||
        product.Consumo_de_Energia === value
    );

    if (matchingProducts !== undefined && matchingProducts.length > 0) {
      setFilteredProducts(matchingProducts);
    } else {
      setFilteredProducts([]);
    }
  };

  const handleCheckboxAcessoriesChange = async (value: string) => {
    console.log(value);
    console.log(products);

    const matchingProducts = products?.filter(
      (product) =>
        product.Fornecedor === value ||
        product.montagem_necessaria === value
    );

    if (matchingProducts !== undefined && matchingProducts.length > 0) {
      setFilteredProducts(matchingProducts);
    } else {
      setFilteredProducts([]);
    }
  };

  function handleComputadores(): JSX.Element {
    return (
      <div className="category-item">
        {computerCategory?.map((items: any, index: any) => {
          return (
            <div key={index} className="item">
              <div className="item-header">
                <h1>{items.name}</h1>
              </div>

              <div className="item-body">
                {items.subcategories.map((categories: any) => {
                  return (
                    <div key={categories.name}>
                      <h2>{categories.name}</h2>
                      {categories.valor.map((value: any) => (
                        <div key={value}>
                          <p>
                            <input
                              value={value}
                              onChange={() =>
                                handleCheckboxComputerChange(value)
                              }
                              style={{ marginRight: "1rem" }}
                              type="checkbox"
                            />
                            {value}
                          </p>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  function handleNotebooks(): JSX.Element {
    return (
      <div className="category-item">
        {NotebookDataCategory?.map((items: any, index: any) => {
          return (
            <div key={index} className="item">
              <div className="item-header">
                <h1>{items.name}</h1>
                <KeyboardArrowUpIcon />
              </div>

              <div className="item-body">
                {items.subcategories.map((categories: any) => {
                  return (
                    <div key={categories.name}>
                      <h2>{categories.name}</h2>
                      {categories.valor.map((value: any) => (
                        <div key={value}>
                          <p>
                            <input
                              style={{ marginRight: "1rem" }}
                              value={value}
                              onChange={() =>
                                handleCheckboxNotebookChange(value)
                              }
                              type="checkbox"
                            />
                            {value}
                          </p>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  function HandleHardware(): JSX.Element {
    return (
      <div className="category-item">
        {HardwareDataCategory?.map((items: any, index: any) => {
          return (
            <div key={index} className="item">
              <div className="item-header">
                <h1>{items.name}</h1>
                <KeyboardArrowUpIcon />
              </div>

              <div className="item-body">
                {items.subcategories.map((categories: any) => {
                  return (
                    <div key={categories.name}>
                      <h2>{categories.name}</h2>
                      {categories.valor.map((value: any) => (
                        <div key={value}>
                          <p>
                            <input
                              onChange={() =>
                                handleCheckboxHardwareChange(value)
                              }
                              style={{ marginRight: "1rem" }}
                              type="checkbox"
                            />
                            {value}
                          </p>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  function handleAcessorios(): JSX.Element {
    return (
      <div className="category-item">
        {accessoriesCategory?.map((items: any, index: any) => {
          return (
            <div key={index} className="item">
              <div className="item-header">
                <h1>{items.name}</h1>
                <KeyboardArrowUpIcon />
              </div>

              <div className="item-body">
                {items.subcategories.map((categories: any) => {
                  return (
                    <div key={categories.name}>
                      <h2>{categories.name}</h2>
                      {categories.valor.map((value: any) => (
                        <div key={value}>
                          <p>
                            <input
                              onChange={() =>
                                handleCheckboxAcessoriesChange(value)
                              }
                              style={{ marginRight: "1rem" }}
                              type="checkbox"
                            />
                            {value}
                          </p>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };
  let totalPages;
  let productsToShow;
  const [emptyProducts, __setEmptyProducts] = useState<IMockProducts>({
    id: 4,
    Marca: "Adicionar",
    Fabricante: "Voce não possui produtos",
    Formato: "Nenhum",
    Tipo_de_Hardware: "Nenhum",
    Consumo_de_Energia: "Nenhum",
    Marca_do_processador: "Intel",
    montagem_necessaria:"Não",
    Tipo_de_processador: "",
    Velocidade_do_processador: "4.0 GHz",
    Tipo_de_soquete_do_processador: "LGA 1200",
    Numero_de_processadores: "4",
    Tamanho_da_memoria: "32 GB",
    Tecnologia_da_memoria: "DDR4",
    Tipo_de_Memoria: "DDR4 SDRAM",
    Tamanho_do_HD: "1.5 TB",
    Tecnologia_do_HD: "SSD",
    Interface_do_HD: "NVMe",
    Marca_do_chipset_de_video: "NVIDIA",
    Descricao_da_placa_de_video: "NVIDIA GeForce RTX 3080",
    Tipo_de_conexao: "Wi-Fi",
    Tecnologia_de_conexao: "Bluetooth",
    Plataforma_de_hardware: "PC",
    Sistema_operacional: "Windows 11",
    Peso_do_produto: "11 Kilograms",
    Dimensoes_da_embalagem: "60 x 58 x 35 cm",
    Codigo: "C123123",
    Fornecedor: "Thelema",
    Quantidade_em_estoque: 8,
    User_Id: 1,
    Codigo_das_Imagens: "D456456",
    Dimensoes_do_pacote: "60 x 58 x 35 centímetros",
    Descricao_final_sobre_o_produto:
      "Adicione Produtos a sua plataforma e será exibido aqui",
    Valor_a_vista: "R$ 00,00",
    Valor_a_prazo: "R$ 00,00",
  });
  if (products) {
    totalPages = Math.ceil(products.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    productsToShow = products.slice(startIndex, endIndex);
  }

  return (
    <MainComponentOnPage>
      <div className="filters">{contentToRender}</div>
      <div className="space"></div>
      <div className="body-content">
        <div className="header-dody-filter">
          <div className="filter-by">
            <p>Ordenar por </p>
            <Select
              placeholder="Menor preço"
              indicator={<KeyboardArrowDown />}
              sx={{
                width: "40%",
                height: "3.1rem",
                backgroundColor: "transparent",
                [`& .${selectClasses.indicator}`]: {
                  transition: "0.2s",
                  [`&.${selectClasses.expanded}`]: {
                    transform: "rotate(-180deg)",
                  },
                },
              }}
            >
              <Option value="Maior valor">Maior valor</Option>
              <Option value="Menor Valor">Menor Valor</Option>
              <Option value="Mais vendido">Mais vendido</Option>
              <Option value="Destaques">Destaques</Option>
            </Select>
          </div>
        </div>
        {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
          filteredProducts.map((productsList: IMockProducts) => {
            return (
              <CardProduct key={productsList.id} productsList={productsList} />
            );
          })
        ) : Array.isArray(filteredProducts) && filteredProducts.length === 0 ? (
          <>
            <CardProduct key="empty-1" productsList={emptyProducts} />
          </>
        ) : Array.isArray(products) &&
          products.some((product) => product.id) ? (
          productsToShow?.map((productsList: IMockProducts) => {
            return (
              <CardProduct key={productsList.id} productsList={productsList} />
            );
          })
        ) : (
          <>
            <CardProduct key="empty-1" productsList={emptyProducts} />
            <CardProduct key="empty-2" productsList={emptyProducts} />
            <CardProduct key="empty-3" productsList={emptyProducts} />
            <CardProduct key="empty-4" productsList={emptyProducts} />
            <CardProduct key="empty-5" productsList={emptyProducts} />
            <CardProduct key="empty-6" productsList={emptyProducts} />
          </>
        )}
        <div className="pagination-data">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </div>
      </div>
    </MainComponentOnPage>
  );
}

export default GeneralFunction;
