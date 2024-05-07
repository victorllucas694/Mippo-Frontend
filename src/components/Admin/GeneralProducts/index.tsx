import { Button, Pagination } from "@mui/material";
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
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";

interface CategoryProduct {
  categoryBySearchProductPage: string | null;
}

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

function GeneralFunction({ categoryBySearchProductPage }: CategoryProduct) {
  console.log(categoryBySearchProductPage);
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
    searchInput,
  } = useRequestsProductsContext();

  const { products } = useProductsContext();

  const [contentToRender, setContentToRender] = useState<JSX.Element | null>(
    null
  );
  const [category, setCategory] = useState<string | null>("");

  useEffect(() => {
    const category = getCategory();
    setCategory(category);
  }, []);

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

  const [checkboxStates, setCheckboxStates] = useState<{
    [subcategory: string]: { [value: string]: boolean };
  }>({});

  const handleCheckboxChange = (subcategory: string, value: string) => {
    setCheckboxStates((prevStates) => ({
      ...prevStates,
      [subcategory]: {
        ...prevStates[subcategory],
        [value]: !prevStates[subcategory]?.[value],
      },
    }));
  };

  const handleButton = async () => {
    console.log(searchInput);
  };

  function handleComputadores(): JSX.Element {
    return (
      <div className="category-item">
        {computerCategory?.map((items: any, index: any) => {
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
                              value={value}
                              // checked={
                              //   checkboxStates[categories.name]?.[value] ||
                              //   false
                              // }
                              onChange={() =>
                                handleCheckboxChange(categories.name, value)
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
        <div className="button-apply">
          <Button sx={{ margin: "0 1rem", width: "200px" }} variant="outlined">
            Limpar
          </Button>
          <Button
            sx={{ width: "300px" }}
            variant="contained"
            onClick={handleButton}
          >
            Aplicar filtro
          </Button>
        </div>
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
        <div className="button-apply">
          <Button sx={{ margin: "0 1rem", width: "200px" }} variant="outlined">
            Limpar
          </Button>
          <Button sx={{ width: "300px" }} variant="contained">
            Aplicar filtro
          </Button>
        </div>
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

        <div className="button-apply">
          <Button sx={{ margin: "0 1rem", width: "200px" }} variant="outlined">
            Limpar
          </Button>
          <Button sx={{ width: "300px" }} variant="contained">
            Aplicar filtro
          </Button>
        </div>
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
        <div className="button-apply">
          <Button sx={{ margin: "0 1rem", width: "200px" }} variant="outlined">
            Limpar
          </Button>
          <Button sx={{ width: "300px" }} variant="contained">
            Aplicar filtro
          </Button>
        </div>
      </div>
    );
  }

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
    console.log(event);
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
    <MainComponentOnPage>
      <div className="filters">{contentToRender}</div>
      <div className="body-content">
        <div className="header-dody-filter">
          <h1>{category}</h1>

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
        {products
          ? productsToShow?.map((productsList: IMockProducts) => {
              return <CardProduct productsList={productsList} />;
            })
          : null}

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
