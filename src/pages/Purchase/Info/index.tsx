import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { useAuth } from "../../../contexts/AuthenticateContext";
import { useAxios } from "../../../providers/AxiosProvider";
import { ListItemButton } from "@mui/material";

interface Product {
  Marca: string;
  price: number;
  Valor_a_prazo: number;
  getProductsByOrderId: ProductCallBack;
}

interface ProductCallBack {
  Marca: string;
  price: number;
  Valor_a_prazo: number;
}

const Info: React.FC = () => {
  const { id } = useAuth();
  const { axiosInstance } = useAxios();
  const token = localStorage.getItem("c__token");
  const [__products, setProducts] = React.useState<Product[]>([]);
  const [productsCallBack, setProductsCallBack] = React.useState<
    ProductCallBack[]
  >([]);
  const [totalValue, setTotalValue] = React.useState<number>(0);

  const getProductsByUserId = async () => {
    try {
      const req = await axiosInstance.get(`/payment-shipping-cart/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("req", req);
      const productsData: Product[] = req.data;
      setProducts(productsData);
      const callBackData = productsData.map(
        (product) => product.getProductsByOrderId
      );
      setProductsCallBack(callBackData);

      const total = callBackData.reduce((acc, product) => {
        return acc + parseFloat(product.Valor_a_prazo.toString() || "0");
      }, 0);
      setTotalValue(total);
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
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(parseFloat(totalValue.toString()))}
      </Typography>
      <List
        sx={{ width: "90%", bgcolor: "background.paper" }}
        aria-label="contacts"
      >
        {productsCallBack.map((product, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <ListItemText primary={product.Marca} />
              <Typography variant="body1" fontWeight="medium">
                {product.price}
              </Typography>
              <ListItemText
                primary={new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(parseFloat(product.Valor_a_prazo.toString()))}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default Info;
