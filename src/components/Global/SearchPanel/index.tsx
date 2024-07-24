import {
  Divider,
  Paper,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import { SearchPanelContainer } from "./styles";
import * as React from "react";
import SearchIcon from "@mui/icons-material/Search";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Badge from "@mui/material/Badge";
import { useAuth } from "../../../contexts/AuthenticateContext";
import { useAxios } from "../../../providers/AxiosProvider";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { usePagesManagement } from "../../../contexts/PagesManagementContext";

function SearchPanel() {
  const { id } = useAuth();

  // const [search, setSearch] = React.useState<string>("");
  const { axiosInstance } = useAxios();
  const [badgeShippingCartAllPages, setBadgeShippingCartAllPages] =
    React.useState<number>(0);

  const [totalPriceFiltred, setTotalPriceFiltred] = React.useState<number>(0);

  const navigateToShippingCart = async () => {
    window.location.href = `http://localhost:5173/purchase/${id}`;
  };

  React.useEffect(() => {
    verifyUserLoggedByAddProductToShoppingCart(id);
    
  }, [totalPriceFiltred]);

  const token = localStorage.getItem("c__token");
  let totalAmount = 0;
  const verifyUserLoggedByAddProductToShoppingCart = async (id: number) => {
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

      const cleanNumber = product.Valor_a_prazo.replace(/[^\d,]/g, "").replace(
        ",",
        "."
      );
      const number = parseFloat(cleanNumber);

      totalAmount += number;

      setTotalPriceFiltred(totalAmount);
    });

    setBadgeShippingCartAllPages(response.data.length);
    console.log(badgeShippingCartAllPages);
  };

  const navigateToHomePage = () => {
    window.location.href = `http://localhost:5173/`;
  };

  // const searchPanel = () => {
  //   const currentURL = window.location.pathname;
  //   const urlParts = currentURL.split("/");
  //   const category = urlParts[1];

  //   console.log("category", category);
  //   console.log(search);
  // };

  const [panelData, setPanelData] = React.useState<string>("");
  const { setPageData, PageData } = usePagesManagement();

  const findPanel = async () => {
    const req = await axiosInstance.post(`/inventary-management/${panelData}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setPageData(req.data);
  };
  
  
  console.log(PageData)

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
              onChange={(e) => setPanelData(e.target.value)}
              placeholder="Digite a marca do produto"
              inputProps={{ "aria-label": "search google maps" }}
            />
            <IconButton
              onClick={findPanel}
              type="button"
              sx={{ p: "10px", height: "3rem" }}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton
              sx={{ p: "10px" }}
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              aria-label="directions"
            >
              <ArrowDropDownIcon />
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleClose}>Computadores</MenuItem>
                <MenuItem onClick={handleClose}>Hardware</MenuItem>
                <MenuItem onClick={handleClose}>Acessórios</MenuItem>
                <MenuItem onClick={handleClose}>Notebook</MenuItem>
              </Menu>
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
