import * as React from "react";
import Button from "@mui/material/Button";
import { ButtonSection, ModalBox, PaperBox, PaymentAllSteps } from "./styles";
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
import Box from "@mui/material/Box";
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
  const [totalCodeOfferPrice, setTotalCodeOfferPrice] =
    React.useState<number>(0.0);

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
    console.log(products)
    products.data.map((products: { getProductsByOrderId: any }) => {
      const { getProductsByOrderId } = products;
      

      const cleanNumber = getProductsByOrderId.Valor_a_vista.replace(/[^\d.]/g, '').replace(',', '.');
      const number = parseFloat(cleanNumber);

      totalAmount += number;

      setTotalPriceFiltredData(totalAmount)
    });
    setTotalOfferPrice(arrToOfferPrices);
  };

  const getCartProducts = async () => {
    const products = await axiosInstance.get(
      `/payment-shipping-cart/cart/${id}`
    );

    console.log(products)

    setCartProducts(products.data);
  };

  const { paymentData } = useMyContext();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalBox>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Endereço de entrega
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Você pode adicionar mais de um endereço se necessário.
          </Typography>
          <br />
          <AddressForm />
        </ModalBox>
      </Modal>
      <PaymentAllSteps>
        <div className="body-data">
          <div className="delivery-data">
            <div className="header-delivery-data">
              <div className="title-delivery-data">
                <h1>Endereço de entrega</h1>
              </div>
              <Button
                onClick={handleOpen}
                startIcon={<AddIcon />}
                sx={{ width: "15rem", height: "3rem", margin: "auto 0" }}
                variant="outlined"
              >
                Adicionar endereço
              </Button>
            </div>

            <div className="papers-address">
              {paperProducts?.map((products: IPaperProduct, index: number) => {
                return (
                  <PaperBox>
                    <div className="header-paper">
                      <h1>{products.address}</h1>

                      <div className="buttons-header">
                        <div className="icon">
                          <EditIcon
                            sx={{
                              width: "18px",
                              height: "18px",
                              color: "rgb(120, 120, 120)",
                            }}
                          />
                        </div>
                        <div className="icon">
                          <DeleteOutlineIcon
                            sx={{
                              width: "18px",
                              height: "18px",
                              color: "#E94560",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="body-paper">
                      <h1>{
                      products.city + " " + products.state + " " + products.CEP + ", " + products.country
                      }</h1>
                    </div>
                  </PaperBox>
                );
              })}
            </div>
          </div>
          <br />
          <div className="payment-data">
            <div className="header-payment-data">
              <div className="title-payment-data">
                <h1>Informações de pagamento</h1>
              </div>
            </div>
            <p>Digite as informações do cartão</p>
            <Grid sx={{ width: "95%", margin: "auto" }} container spacing={2}>
              <Grid xs={6}>
                <TextField
                  sx={{ width: "95%" }}
                  id="outlined-basic"
                  label="Nome do titular"
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid xs={6}>
                <TextField
                  sx={{ width: "95%" }}
                  required
                  id="outlined-basic"
                  label="Número do cartão"
                  variant="outlined"
                />
              </Grid>
            </Grid>

            <Grid
              sx={{ width: "95%", margin: "2rem auto" }}
              container
              spacing={2}
            >
              <Grid xs={4}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Mês de expiração
                  </InputLabel>
                  <Select
                    sx={{ width: "95%" }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={123}
                    label="Mês de expiração"
                    // onChange={handleChange}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid xs={4}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Ano de expiração
                  </InputLabel>
                  <Select
                    sx={{ width: "95%" }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={123}
                    label="Ano de expiração"
                    // onChange={handleChange}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid xs={4}>
                <TextField
                  required
                  sx={{ width: "95%" }}
                  id="outlined-basic"
                  label="CVC/CVC"
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Grid
              sx={{ width: "95%", margin: "2rem auto" }}
              container
              spacing={2}
            >
              <Grid xs={12}>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Salvar dados do meu cartão"
                />
              </Grid>
            </Grid>
            <h5>Eu tenho o código</h5>
            <Grid
              sx={{ width: "95%", margin: "2rem auto" }}
              container
              spacing={2}
            >
              <Grid xs={6}>
                <TextField
                  sx={{ width: "95%" }}
                  required
                  id="outlined-basic"
                  label="Código de desconto"
                  variant="outlined"
                />
              </Grid>
              <Grid xs={3}>
                <Button
                  sx={{ width: "70%", height: "80%", margin: ".25rem auto" }}
                  variant="outlined"
                >
                  Enviar
                </Button>
              </Grid>
            </Grid>

            <Grid
              sx={{ width: "95%", margin: "2rem auto" }}
              container
              spacing={2}
            >
              <Grid xs={12}>
                <Button
                  sx={{
                    float: "inline-end",
                    height: "3rem",
                    width: "14rem",
                    margin: "auto",
                  }}
                  variant="contained"
                >
                  Finalizar Compra
                </Button>
              </Grid>
            </Grid>
          </div>
        </div>
        <div className="cart-data">
          <div className="header-cart-items">
            <h1>Seus pedidos</h1>
          </div>

          <div className="body-cart-items">
            <div className="all-data">
              {cartProducts.map((products) => {
                return (
                  <div className="item-product">
                    <h1>
                      {products.getProductsByOrderId.Marca}
                    </h1>
                  </div>
                );
              })}
            </div>
            <div className="all-data">
              {cartProducts.map((products, index) => (
                <div className="item-product" key={index}>
                  {index === 0 ? (
                    <>
                      <h1>Total sem desconto</h1> <h1>R$ {totalPriceFiltredData}</h1>
                    </>
                  ) : index === 1 ? (
                    <>
                      <h1>Total a vista</h1> <h1>R$ {totalOfferPrice}</h1>
                    </>
                  ) : index === 2 ? (
                    <>
                      <h1>Valor do frete</h1> <h1>R$ {50.99}</h1>
                    </>
                  ) : null}
                </div>
              ))}
            </div>
            <div className="all-final-data">
              <div className="item-product">
                <h1>Total:</h1> <h1>R$ {totalPrice + 50.99}</h1>
              </div>
            </div>
          </div>
        </div>
      </PaymentAllSteps>
    </React.Fragment>
  );
}
