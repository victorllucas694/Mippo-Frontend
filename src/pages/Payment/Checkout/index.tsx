import * as React from "react";
import Button from "@mui/material/Button";
import { PaymentAllSteps } from "./styles";
import { useAxios } from "../../../providers/AxiosProvider";
import { useAuth } from "../../../contexts/AuthenticateContext";
import AddIcon from "@mui/icons-material/Add";
import { useMyContext } from "../../../contexts/PaymentContext";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AddressForm from "../AddressForm";
import { useState } from "react";
import ProductDetails from "../../../components/Global/ProductDetails";
import Textarea from "@mui/joy/Textarea";
import Stack from "@mui/joy/Stack";

export default function Checkout() {
  const { id } = useAuth();
  const { axiosInstance } = useAxios();
  const token = localStorage.getItem("c__token");

  React.useEffect(() => {
    getInventaryUserProducts(id);
  }, []);

  const [getOrderProducts, setGetOrderProducts] = useState([]);

  const getInventaryUserProducts = async (id: number) => {
    const getOrderProducts = await axiosInstance.get(
      `/payment-shipping-cart/cart/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setGetOrderProducts(getOrderProducts.data);
    console.log("getOrderProducts", getOrderProducts.data);
  };
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

  const handleTextareaFocus = () => {
    textareaRef.current?.focus();
  };
  return (
    <React.Fragment>
      <PaymentAllSteps>
        <div className="body-cards">
          {getOrderProducts.map((cards) => {
            return <ProductDetails getOrderProducts={cards} />;
          })}
        </div>
        <div className="body-cards">
          <div className="cart-values">
            <div className="header-cart">
              <h1>Resgate seu cupom</h1>
            </div>
            <div className="shipping-cart-code">
              <TextField
                required
                id="name"
                name="name"
                label="Código de desconto"
                fullWidth
                type="text"
                autoComplete="shipping address-level2"
                variant="outlined"
                sx={{
                  width: "70%",
                  margin: "auto",
                }}
              />
              <Button
                sx={{ width: "25%", height: "3rem", margin: "auto" }}
                variant="outlined"
              >
                aplicar
              </Button>
            </div>
            <div className="prices-values"> 
                
            </div>
          </div>
        </div>
      </PaymentAllSteps>
    </React.Fragment>
  );
}
