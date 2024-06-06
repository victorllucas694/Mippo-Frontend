import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { useAuth } from "../../../contexts/AuthenticateContext";
import { useAxios } from "../../../providers/AxiosProvider";
import { ListItemButton, ListItemIcon } from "@mui/material";

export default function Info() {
  const { id } = useAuth();
  const { axiosInstance } = useAxios();
  const token = localStorage.getItem("c__token");
  const [products, setProducts] = React.useState([]);
  const [productsCallBack, setProductsCallBack] = React.useState({});

  const getProductsByUserId = async () => {
    try {
      const req = await axiosInstance.get(`/payment-shipping-cart/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const productsData = req.data;
      setProducts(productsData);
      productsData.forEach((product: any) => {
        setProductsCallBack(product.getProductsByOrderId);
      });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  React.useEffect(() => {
    getProductsByUserId();
  }, []);
  return (
    <>
      <Typography variant="subtitle2" color="text.secondary">
        Total
      </Typography>
      <Typography variant="h4" gutterBottom>
        {productsCallBack.Valor_a_prazo}
      </Typography>
      <List
        sx={{ width: "100%", maxWidth: 450, bgcolor: "background.paper" }}
        aria-label="contacts"
      >
        {products.map((getProductsByOrderId) => {
          return (
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary={productsCallBack.Marca} />
                <Typography variant="body1" fontWeight="medium">
                  {productsCallBack.price}
                </Typography>
                <ListItemText primary={productsCallBack.Valor_a_prazo} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </>
  );
}
