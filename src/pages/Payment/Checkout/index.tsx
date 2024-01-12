import * as React from "react";
import Button from "@mui/material/Button";
import { ModalBox, PaperBox, PaymentAllSteps } from "./styles";
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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

interface CartProduct {
  getProductsByOrderId: Record<string, unknown>;
}

export default function Checkout() {
  const { axiosInstance } = useAxios();
  const { id } = useAuth();
  const [cartProducts, setCartProducts] = React.useState<CartProduct[]>([]);
  const [totalPrice, setTotalPrice] = React.useState<number>(0);
  const [totalOfferPrice, setTotalOfferPrice] = React.useState<number>(0);

  React.useEffect(() => {
    getCartProducts();
    setterTotalPrice();
    setterTotalPriceWithOffer();
    getPaperList();
  }, []);

  const setterTotalPrice = async () => {
    const products = await axiosInstance.get(
      `/payment-shipping-cart/cart/${id}`
    );

    let arrToPrices: number = 0;

    products.data.map((products: { getProductsByOrderId: any }) => {
      const { getProductsByOrderId } = products;
      arrToPrices += parseFloat(getProductsByOrderId.Valor_a_prazo);
    });
    setTotalPrice(arrToPrices);
  };

  const [totalPriceFiltredData, setTotalPriceFiltredData] = useState<number>(0);

  const setterTotalPriceWithOffer = async () => {
    const products = await axiosInstance.get(
      `/payment-shipping-cart/cart/${id}`
    );

    let arrToOfferPrices: number = 0;
    let totalAmount: number = 0;
    console.log(products);
    products.data.map((products: { getProductsByOrderId: any }) => {
      const { getProductsByOrderId } = products;

      const cleanNumber = getProductsByOrderId.Valor_a_vista.replace(
        /[^\d.]/g,
        ""
      ).replace(",", ".");
      const number = parseFloat(cleanNumber);

      totalAmount += number;

      setTotalPriceFiltredData(totalAmount);
    });
    setTotalOfferPrice(arrToOfferPrices);
  };

  const getCartProducts = async () => {
    const products = await axiosInstance.get(
      `/payment-shipping-cart/cart/${id}`
    );

    console.log("products", products);

    console.log(products)

    setCartProducts(products.data);
  };

  const { paymentData } = useMyContext();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const style = {
  //   position: "absolute" as "absolute",
  //   top: "50%",
  //   left: "50%",
  //   transform: "translate(-50%, -50%)",
  //   width: 500,
  //   bgcolor: "background.paper",
  //   border: "2px solid #000",
  //   boxShadow: 24,
  //   p: 4,
  // };

  interface IPaperProduct {
    CEP: string;
    User_Id: string;
    address: string;
    address_other: string;
    city: string;
    country: string;
    id: string;
    last_name: string;
    name: string;
    state: string;
  }

  const [paperProducts, setPaperProducts] = useState<IPaperProduct[] | null>(
    null
  );

  const getPaperList = async () => {
    const token = localStorage.getItem("c__token");
    const papers = await axiosInstance.get(`/user-address/get-all/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setPaperProducts(papers.data);
  };

  return (
    <React.Fragment>
      
    </React.Fragment>
  );

}
