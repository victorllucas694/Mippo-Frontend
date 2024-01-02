import { Button, IconButton, InputBase, Paper } from "@mui/material";
import { ContainerGeneralPackageList } from "../../Global/GeneralPackageList/styles";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import CategoryIcon from "@mui/icons-material/Category";
import { useEffect, useState } from "react";
import { useAxios } from "../../../providers/AxiosProvider";
import { useAuth } from "../../../contexts/AuthenticateContext";
import { OrderTrackingBoxWrapper } from "./styles";
import Snackbar from '@mui/material/Snackbar';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from '@mui/icons-material/Close';
import TabsOrder from "./TabsOrder";

function OrderTracking() {
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
        console.log(foundedAllOrders);
        setTotalOrders(foundedAllOrders.data.length);

        if (foundedAllOrders.data.admin === "true") {
          foundedAllOrders.data.map((orders: any) => {
            console.log(orders);
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
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Note archived"
        action={true}
      />
      <ContainerGeneralPackageList>
        <div className="header-table">
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 500,
              height: "3.2rem",
              margin: "auto 0",
              border: "1px solid rgb(230, 230, 230)",
              boxShadow: "3px 3px 15px -8px rgb(200, 200, 200)",
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1, height: "3rem" }}
              placeholder="Digite o nome do usuário"
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
            Filtrar por ID
          </Button>
          <Button
            startIcon={<CategoryIcon />}
            variant="contained"
            onClick={handleClickOpen}
            sx={{
              height: "3rem",
            }}
          >
            Limpar todos os filtros
          </Button>
        </div>
      </ContainerGeneralPackageList>
      <OrderTrackingBoxWrapper>
        <TabsOrder />
      </OrderTrackingBoxWrapper>
    </>
  );
}

export default OrderTracking;
