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
import { Chip } from "@mui/material";

function Row(props: {
  row: { product: string; name: string; history: any[] };
}) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

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
            label="Não pago"
            variant="outlined"
            sx={{ border: "none" }}
            color="error"
          />
        </TableCell>
        <TableCell>
          <Chip
            label="Nao retirado"
            variant="outlined"
            sx={{ border: "none" }}
            color="error"
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={6} style={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom>
                Histórico
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Data</TableCell>
                    <TableCell>Cliente</TableCell>
                    <TableCell align="center">Quantidade</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow, index) => (
                    <TableRow key={index}>
                      <TableCell>{historyRow.date}</TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
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
      <Table aria-label="collapsible table">
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
                  product: row.product.Marca,
                  name: `${row.user.name} ${row.user.last_name}`,
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
