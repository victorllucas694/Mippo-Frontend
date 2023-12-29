import { InputBase, Paper } from "@mui/material";
import { ContainerGeneralPackageList } from "../../Global/GeneralPackageList/styles";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useEffect, useState } from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import OrderTicketsTable from "./OrderTicketsTable";
import { TicketsManagement } from "./styles";
import AddCardIcon from "@mui/icons-material/AddCard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { useAxios } from "../../../providers/AxiosProvider";
import { useAuth } from "../../../contexts/AuthenticateContext";

interface TicketsData {
  label: string;
  number: string;
  percent: number;
}

function ProductsOrderTickets() {
  const [shippingCartTotal, setShippingCartTotal] = useState<string>("");
  const { axiosInstance } = useAxios();
  const { id } = useAuth();
  let priceTotal = 0;
  const parseBRL = (valor: number): string => {
    const formatoDinheiro = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    return formatoDinheiro.format(valor);
  };
  const [totalOrders, setTotalOrders] = useState<number>(0);

  useEffect(() => {
    const token = localStorage.getItem("c__token");
    const findAllOrders = async () => {
      try {
        const foundedAllOrders = await axiosInstance.get(
          `/order-management/get/all/orders/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTotalOrders(foundedAllOrders.data.length);

        if(foundedAllOrders.data.admin === 'true') {
          foundedAllOrders.data.map((orders: any) => {
            console.log(orders)
            if (orders.product.Valor_a_prazo) {
              console.log(orders.product.Valor_a_prazo);
              priceTotal += parseFloat(orders.product.Valor_a_prazo);
            }
          });
  
          const formattedTotal = parseBRL(priceTotal);
          setShippingCartTotal(formattedTotal);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
      console.log(priceTotal);
    };

    findAllOrders();
  }, [axiosInstance, shippingCartTotal, id]);

  const TicketsData: TicketsData[] = [
    {
      label: "Solicitações de pedidos em aberto",
      number: "9",
      percent: 0,
    },
    {
      label: "Pedidos Semanais",
      number: "4",
      percent: 0,
    },
    {
      label: "Valor acumulado",
      number: shippingCartTotal,
      percent: 0,
    },
  ];

  return (
    <ContainerGeneralPackageList>
      <div className="header-table">
        <Paper
          component="form"
          sx={{
            display: "flex",
            alignItems: "center",
            width: 450,
            height: "3.2rem",
            margin: "auto 0",
            border: "1px solid rgb(230, 230, 230)",
            boxShadow: "3px 3px 15px -8px rgb(200, 200, 200)",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1, height: "3rem" }}
            placeholder="Digite o código do pedido"
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
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
        <IconButton
          sx={{
            height: "45px",
            width: "45px",
            borderRadius: "2px",
            border: "1px solid rgb(230, 230, 230)",
            margin: "auto -.8rem",
            color: "rgb(100, 100, 100)",
          }}
          aria-label="delete"
          size="small"
        >
          <CalendarMonthIcon fontSize="inherit" />
        </IconButton>
      </div>
      <TicketsManagement>
        {TicketsData.map((order, index: number) => {
          return index === 0 ? (
            <div className="box-order active">
              <div style={{ display: "flex" }}>
                <AddCardIcon
                  sx={{ width: "25px", height: "25px", margin: ".4rem 0" }}
                  fontSize="inherit"
                />
                <h1>4</h1>
              </div>
              <p>{order.label}</p>
            </div>
          ) : (
            <div className="box-order">
              <div style={{ display: "flex" }}>
                <AccountBalanceIcon
                  sx={{ width: "25px", height: "25px", margin: ".4rem 0" }}
                  fontSize="inherit"
                />
                <h1>{order.number}</h1>
              </div>
              <p>{order.label}</p>
            </div>
          );
        })}
      </TicketsManagement>
      <br />
      <OrderTicketsTable />
    </ContainerGeneralPackageList>
  );
}

export default ProductsOrderTickets;
