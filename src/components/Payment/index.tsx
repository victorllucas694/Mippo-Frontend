import * as React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { BoxHeaderPayment } from "./styles";
import { useEffect, useState } from "react";
import { useAxios } from "../../providers/AxiosProvider";
import { useAuth } from "../../contexts/AuthenticateContext";
import { IMockProducts } from "../../Types";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function PaymentProduct() {
  const dataHeader = [
    {
      id: 0,
      label: "Produto",
    },
    {
      id: 0,
      label: "Quantidade",
    },
    {
      id: 0,
      label: "Preço",
    },
    {
      id: 0,
      label: "Delete",
    },
  ];
  const { axiosInstance } = useAxios();
  const { id } = useAuth();

  useEffect(() => {
    getUserOrder();
  }, []);

  const [productOrders, setProductOrders] = useState<IMockProducts[] | null>(
    null
  );

  const getUserOrder = async () => {
    const token = localStorage.getItem("c__token");
    const orderHistory = await axiosInstance.get(
      `/payment-shipping-cart/find/shipping-cart/history/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const { foundedOrderProduct, ordersProduct } = orderHistory.data;
    setProductOrders(ordersProduct);
  };

  useEffect(() => {
    calcTotalPrice();
  }, []);

  const [priceToShipping, setPriceToShipping] = useState<number | null>(null);

  const calcTotalPrice = () => {
    let valTotal: number = 0;
    productOrders?.map((product: IMockProducts) => {
      valTotal += parseFloat(product.Valor_a_vista.replace('R$ ', ''));
    });
    
    setPriceToShipping(valTotal);
    return productOrders;
};

  return (
    <BoxHeaderPayment>
      <div
        className="shopping-cart-itens"
        style={{
          boxShadow: "3px 10px 20px 1px rgb(250, 250, 250)",
          border: "1px solid rgb(240, 240, 240)",
        }}
      >
        <div
          className="header-itens"
          style={{ borderBottom: "1px solid rgb(230, 230, 230)" }}
        >
          {dataHeader.map((item) => {
            return (
              <>
                {item.label === "Produto" ? (
                  <div className="product">
                    <p>Produto</p>
                  </div>
                ) : item.label === "Quantidade" ? (
                  <div className="quantity">
                    <p>Quantidade</p>
                  </div>
                ) : item.label === "Preço" ? (
                  <div className="price">
                    <p>Preço</p>
                  </div>
                ) : item.label === "Delete" ? (
                  <div className="delete"></div>
                ) : null}
              </>
            );
          })}
        </div>
        <div className="header-itens" style={{ backgroundColor: "none" }}>
          <div className="item-order" style={{ backgroundColor: "none" }}>
            {productOrders?.map((order) => {
              return (
                <Box
                  sx={{
                    display: "flex",
                    backgroundColor: "none",
                    borderBottom: "1px solid rgb(230, 230, 230)",
                  }}
                >
                  <div className="product">
                    <div className="image-large-box"></div>
                    <p>
                      {order.Marca +
                        " " +
                        order.Marca_do_processador +
                        " " +
                        order.Tipo_de_processador +
                        " " +
                        order.Velocidade_do_processador +
                        " - RAM " +
                        order.Tipo_de_Memoria}
                    </p>
                  </div>
                  <div className="quantity">
                    <p>1</p>
                  </div>
                  <div className="price">
                    <p>{order.Valor_a_prazo}</p>
                  </div>
                  <div className="delete">
                    <DeleteIcon sx={{ color: "rgb(100, 100, 100)" }} />
                  </div>
                </Box>
              );
            })}
          </div>
        </div>
      </div>

      <div
        style={{
          boxShadow: "3px 10px 20px 1px rgb(250, 250, 250)",
          border: "1px solid rgb(230, 230, 230)",
        }}
        className="shopping-cart-values"
      >
        <div className="header-values">
          <p>Valor Total</p>
        </div>

        <div className="body-cart">
          <div className="total">
            <h1>Total</h1>
            <h1>{priceToShipping}</h1>
          </div>

          <div className="total-offer">
            <p>à vista</p>
            <h1>{priceToShipping}</h1>
            <h5>
              ou em até {productOrders ? productOrders[0]?.Valor_a_prazo : null}{" "}
              12 vezes de <p className="red">R$ 200,00 </p>
            </h5>
            <Button
              component="label"
              variant="contained"
              color="success"
              startIcon={<ShoppingCartIcon />}
              sx={{ width: "100%", height: "3rem" }}
            >
              Finalizar compra
            </Button>
          </div>
        </div>
      </div>
    </BoxHeaderPayment>
  );
}

export default PaymentProduct;
