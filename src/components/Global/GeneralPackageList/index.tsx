import { ContainerGeneralPackageList, ListPackageData } from "./styles";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useAxios } from "../../../providers/AxiosProvider";
import { useAuth } from "../../../contexts/AuthenticateContext";
import { useState } from "react";
import TableProducts from "../TableProducts";
import DOMPurify from "dompurify";

interface IPackageDataType {
  User_Id: number;
  drop_brand: string;
  drop_categories: string;
  drop_code: string;
  drop_description: string;
  drop_products_state: string;
  drop_seller: string;
  id: number;
  min_price: string;
  model_product: string;
  product_name: string;
}

function GeneralPackageList() {
  const [searchProductCode, setSearchProductCode] = useState<string | null>(null)
  const { axiosInstance } = useAxios();
  const { id } = useAuth();
  
  const [foundedPackage, setFoundedPackage] = useState<IPackageDataType[] | null>(null);

  const searchProductByInputProductCode = async () => {
    console.log(foundedPackage);
    const token = localStorage.getItem("c__token");
    const foundedAllProductsByCategory = await axiosInstance(
      `products-management/get/all/products/${id}/${searchProductCode}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setFoundedPackage(foundedAllProductsByCategory.data.foundedProduct)
  }


  return (
    <ContainerGeneralPackageList>
      <div className="header-table">
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 500,
            height: "3.2rem",
            margin: "auto 0",
            border: "1px solid rgb(230, 230, 230)",
            boxShadow: "3px 3px 15px -8px rgb(200, 200, 200)",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1, height: "3rem" }}
            onChange={(e: any) => setSearchProductCode(DOMPurify.sanitize(e.target.value))}
            placeholder="Digite o nome do pacote"
          />
          <IconButton onClick={searchProductByInputProductCode} type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
        <Button
          startIcon={<FilterAltIcon />}
          variant="outlined"
          sx={{
            height: "3rem",
            margin: "auto 2rem",
            border: "1px solid rgb(230, 230, 230)",
            color: "rgb(100, 100, 100)",
          }}
        >
          Filtrar por Codigo
        </Button>
      </div>
      <ListPackageData>
        <TableProducts />
      </ListPackageData>
    </ContainerGeneralPackageList>
  );
}

export default GeneralPackageList;
