import {
  Divider,
  Input,
  Select,
  TextField,
  Paper,
  IconButton,
  InputBase,
} from "@mui/material";
import { SearchPanelContainer } from "./styles";
import * as React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Badge from "@mui/material/Badge";
import { useRequestsProductsContext } from "../../../contexts/RequestsProductsContext";
import { useAuth } from "../../../contexts/AuthenticateContext";
import { IMockProducts } from "../../../Types";
import { useAxios } from "../../../providers/AxiosProvider";

interface SearchPanelDataItem {
  id: number;
  image?: string;
  label?: string;
  contact?: string;
}

interface ISearchPanelDataPreset {
  searchPanelDataPreset: SearchPanelDataItem[];
}

function SearchPanel({ searchPanelDataPreset }: ISearchPanelDataPreset) {
  const [currency, setCurrency] = React.useState<string>("dollar");
  const { id } = useAuth();

  const userid = id;
  const [search, setSearch] = React.useState<string>("");
  const { axiosInstance } = useAxios();
  const [badgeShippingCartAllPages, setBadgeShippingCartAllPages] =
    React.useState<number>(0);

  const [totalPriceFiltred, setTotalPriceFiltred] = React.useState<number>(0)

  const navigateToShippingCart = async () => {
    window.location.href = `http://localhost:5173/payment/${id}`;
  };

  React.useEffect(() => {
    verifyUserLoggedByAddProductToShoppingCart(id);
  }, [totalPriceFiltred]);
  let totalAmount = 0;
  const verifyUserLoggedByAddProductToShoppingCart = async (id: number) => {
    const token = localStorage.getItem("c__token");

    const response = await axiosInstance.get(
      `/order-management/get/all/user/orders/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const getTotalAmount = await axiosInstance.get(
      `/order-management/get/total/amount/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    getTotalAmount.data.map((getProducts: any) => {
      console.log(getProducts);

      const { product } = getProducts;

      const cleanNumber = product.Valor_a_prazo.replace(/[^\d,]/g, '').replace(',', '.');
      const number = parseFloat(cleanNumber);

      totalAmount += number;

      setTotalPriceFiltred(totalAmount)
    })


    console.log(response.data);

    setBadgeShippingCartAllPages(response.data.length);
    console.log(badgeShippingCartAllPages);
  };

  const navigateToHomePage = () => {
    window.location.href = `http://localhost:5173/`;
  };


  const searchPanel = () => {
    const currentURL = window.location.pathname;
    const urlParts = currentURL.split("/");
    const category = urlParts[1];

    console.log("category", category);
    console.log(search);
  };

  return (
    <SearchPanelContainer>
      <div className="box-main-content">
        <div onClick={navigateToHomePage} className="brand">
          <img src="https://img.freepik.com/free-vector/branding-identity-corporate-vector-logo-design_460848-8717.jpg?w=1380&t=st=1695394137~exp=1695394737~hmac=7fb024e8fca3923032fb13abfbb6a69979428b9cb603d67a8439f278c3d1f166" />
        </div>
        <div className="search-panel">
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              border: "1px solid rgb(220, 220, 220)",
              width: "100%",
              boxShadow: "none",
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Como podemos ajudar?"
              inputProps={{ "aria-label": "Como podemos ajudar?" }}
              onChange={(e: any) => setSearch(e.target.value)}
            />
            <IconButton
              onClick={searchPanel}
              type="button"
              sx={{ p: "10px", height: "3rem" }}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton sx={{ p: "10px" }} aria-label="directions">
              <LocalGroceryStoreOutlinedIcon />
            </IconButton>
          </Paper>
        </div>
        <div className="contact-box">
          <div className="favorite-box">
            <Badge badgeContent={1} color="error">
              <FavoriteBorderOutlinedIcon />
            </Badge>
          </div>
          <div className="shop-box">
            <Badge
              onClick={navigateToShippingCart}
              badgeContent={badgeShippingCartAllPages}
              color="error"
            >
              <LocalGroceryStoreOutlinedIcon />
            </Badge>
          </div>
          <div className="sign-in">
            <h1>Total</h1>
            <p>R$ {totalPriceFiltred}</p>
          </div>
        </div>
      </div>
    </SearchPanelContainer>
  );
}

export default SearchPanel;
