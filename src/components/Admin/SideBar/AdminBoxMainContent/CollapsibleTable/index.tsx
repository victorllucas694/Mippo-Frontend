import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useAxios } from "../../../../../providers/AxiosProvider";
import { useAuth } from "../../../../../contexts/AuthenticateContext";
import { Button, Chip } from "@mui/material";
import { BoxCollapse } from "./styles";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function Row(props: {
  row: {
    product: string;
    name: string;
    history: any[];
    id_pedido: number;
    pagamento: string;
    retirado: string;
  };
}) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogProductOpen, setDialogProductOpen] = React.useState(false);
  const { axiosInstance } = useAxios();
  const { id } = useAuth();
  const token = localStorage.getItem("c__token");

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleSendPaymentSuccess = async () => {
    const reqDataAllProducts = await axiosInstance.get(
      `/payment-shipping-cart/success/payment/product/${id}/${row.id_pedido}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setDialogOpen(false);

    console.log(reqDataAllProducts);
  };

  const handleSendProductSuccess = async () => {
    const reqDataAllProducts = await axiosInstance.get(
      `/payment-shipping-cart/success/get/product/${id}/${row.id_pedido}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setDialogProductOpen(false);

    console.log(reqDataAllProducts);
  };

  const handleDialogProductOpen = () => {
    setDialogProductOpen(true);
  };
  const handleDialogProductClose = () => {
    setDialogProductOpen(false);
  }; 

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.product}</TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>
          <Chip
            label={row.pagamento === "paid" ? "Pago" : "Não pago"}
            variant="outlined"
            sx={{ border: "none" }}
            color={row.pagamento === "paid" ? "success" : "error"}
          />
        </TableCell>
        <TableCell>
          <Chip
            label={row.retirado === "true" ? "Retirado" : "Não Retirado"}
            variant="outlined"
            sx={{ border: "none" }}
            color={row.retirado === "true" ? "success" : "error"}
          />
        </TableCell>
      </TableRow>
      <TableRow sx={{ boxShadow: 'none', border: 'none' }} >
        <TableCell colSpan={6} style={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small">
                <TableBody sx={{ boxShadow: 'none', border: 'none' }}>
                  <TableRow >
                    <BoxCollapse>
                      <div className="box-header">
                        <h1>Pagamento</h1>
                        <p>
                          Aprove a retirada do produto na plataforma para melhor
                          gestão de estoque
                        </p>
                      </div>
                      <Button
                        sx={{ width: "10rem" }}
                        variant="outlined"
                        onClick={handleDialogOpen}
                      >
                        Pagamento
                      </Button>
                    </BoxCollapse>
                  </TableRow>
                  <TableRow>
                    <BoxCollapse>
                      <div className="box-header">
                        <h1>Retirada</h1>
                        <p>
                          Aprove a retirada do produto na plataforma para melhor
                          gestão de estoque
                        </p>
                      </div>
                      <Button onClick={handleDialogProductOpen} sx={{ width: "10rem" }} variant="outlined">
                        Retirada
                      </Button>
                    </BoxCollapse>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirmar Pagamento</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Você tem certeza que deseja confirmar o pagamento deste pedido?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancelar</Button>
          <Button onClick={handleSendPaymentSuccess} autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={dialogProductOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirmar Retirada</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Você tem certeza que deseja confirmar a retirada deste pedido?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogProductClose}>Cancelar</Button>
          <Button onClick={handleSendProductSuccess} autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default function CollapsibleTable() {
  const { axiosInstance } = useAxios();
  const { id } = useAuth();
  const token = localStorage.getItem("c__token");
  const [rows, setRows] = React.useState<any[]>([]);

  React.useEffect(() => {
    const getAllOrdersToPaymentProduct = async () => {
      const reqDataAllProducts = await axiosInstance.get(
        `/order-management/get/all/orders/to/fix/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRows(reqDataAllProducts.data);
      console.log(reqDataAllProducts.data);
    };

    getAllOrdersToPaymentProduct();
  }, [axiosInstance, id, token]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ boxShadow: 'none', border: 'none' }} aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Produto</TableCell>
            <TableCell sx={{ boxShadow: "none", border: "none" }}>
              Nome de usuário
            </TableCell>
            <TableCell sx={{ boxShadow: "none", border: "none" }}>
              Pagamento
            </TableCell>
            <TableCell sx={{ boxShadow: "none", border: "none" }}>
              Retirada
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} align="left">
                <Typography color="textSecondary">
                  Nenhum pedido para exibir
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row, index) => (
              <Row
                key={index}
                row={{
                  pagamento: row.order.pagamento,
                  id_pedido: row.order.id,
                  product: row.product.Marca,
                  name: `${row.user.name} ${row.user.last_name}`,
                  retirado: row.order.retirado,
                  history: [],
                }}
              />
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
