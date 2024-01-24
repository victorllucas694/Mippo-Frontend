import * as React from "react";
import Button from "@mui/material/Button";
import { PaymentAllSteps } from "./styles";
import { useAxios } from "../../../providers/AxiosProvider";
import { useAuth } from "../../../contexts/AuthenticateContext";
import { Box, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import ProductDetails from "../../../components/Global/ProductDetails";
import Card from "@mui/joy/Card";
import AspectRatio from "@mui/joy/AspectRatio";
import CardContent from "@mui/joy/CardContent";
import Sheet from "@mui/joy/Sheet";
import AddressForm from "../AddressForm";

export default function Checkout() {
  const { id } = useAuth();
  const { axiosInstance } = useAxios();
  const token = localStorage.getItem("c__token");

  React.useEffect(() => {
    getInventaryUserProducts(id);
    calcTotalPriceNow();
  }, []);

  const [getOrderProducts, setGetOrderProducts] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    console.log("getOrderProducts", getOrderProducts.data.getProductsByOrderId);
  };

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "70%",
    transform: "translate(-50%, -50%)",
    width: "40%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  React.useEffect(() => {
    calcTotalPrice();
  }, []);

  const [priceToShipping, setPriceToShipping] = useState<number>(0);
  const [priceToShippingNow, setPriceToShippingNow] = useState<number>(0);

  const calcTotalPrice = () => {
    let valTotal: number = 0;
    getOrderProducts.map((product: any) => {
      valTotal += Number(product.getProductsByOrderId.Valor_a_vista);
      console.log("product", product);
    });

    setPriceToShipping(valTotal);
  };

  const calcTotalPriceNow = () => {
    let valTotal: number = 0;
    getOrderProducts.map((product: any) => {
      valTotal += Number(product.getProductsByOrderId.Valor_a_prazo);
      console.log("product", product);
    });

    setPriceToShippingNow(valTotal);
  };

  return (
    <React.Fragment>
      <PaymentAllSteps>
        <div className="body-cards">
          {getOrderProducts.length > 0 ? (
            getOrderProducts.map((cards) => {
              return <ProductDetails getOrderProducts={cards} />;
            })
          ) : (
            <Box
              sx={{
                width: "100%",
                position: "relative",
                overflow: { xs: "auto", sm: "initial" },
              }}
            >
              <Box />
              <Card
                orientation="horizontal"
                sx={{
                  width: "100%",
                  flexWrap: "wrap",
                  [`& > *`]: {
                    "--stack-point": "500px",
                    minWidth:
                      "clamp(0px, (calc(var(--stack-point) - 2 * var(--Card-padding) - 2 * var(--variant-borderWidth, 0px)) + 1px - 100%) * 999, 100%)",
                  },
                  overflow: "auto",
                  resize: "horizontal",
                }}
              >
                <AspectRatio
                  flex
                  ratio="1"
                  maxHeight={182}
                  sx={{ minWidth: 182 }}
                >
                  <img loading="lazy" alt="" />
                </AspectRatio>
                <CardContent>
                  <Typography fontSize="xl" fontWeight="lg">
                    Você ainda não tem produtos no carrinho
                  </Typography>
                  <Sheet
                    sx={{
                      bgcolor: "background.level1",
                      borderRadius: "sm",
                      p: 1.5,
                      my: 1.5,
                      display: "flex",
                      gap: 2,
                      "& > div": { flex: 1 },
                    }}
                  >
                    <div>
                      <Typography>Vendas</Typography>
                      <Typography fontWeight="lg">0</Typography>
                    </div>
                    <div>
                      <Typography>Favoritos</Typography>
                      <Typography fontWeight="lg">0</Typography>
                    </div>
                    <div>
                      <Typography>Taxa de aprovação</Typography>
                      <Typography fontWeight="lg">0</Typography>
                    </div>
                  </Sheet>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1.5,
                      "& > button": { flex: 1 },
                    }}
                  >
                    <Button variant="outlined">Cancelar</Button>
                    <Button color="primary">Compra unica</Button>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          )}
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
              <div className="prices">
                <h3>Total sem desconto</h3>
                R${priceToShippingNow},00
              </div>
              <div className="prices">
                <h3>Total com desconto</h3>
                R$ {priceToShipping},00
              </div>
            </div>
            <Button
              onClick={handleOpen}
              sx={{ width: "90%", height: "3rem", margin: "2rem" }}
              variant="contained"
            >
              Comprar produtos
            </Button>
          </div>
        </div>
      </PaymentAllSteps>
    </React.Fragment>
  );
}
