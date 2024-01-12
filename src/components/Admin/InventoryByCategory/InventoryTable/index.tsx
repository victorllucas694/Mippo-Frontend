import {
  ImageContainer,
  InventoryTableRootContainer,
  StatusProduct,
} from "./styles";
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
import { TablePagination } from "@mui/material";
import { ActionsBoxWrapper } from "../../Dashboard/Products/Suppliers/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useAxios } from "../../../../providers/AxiosProvider";

function createData(
  name: string,
  brand: string,
  product_dimension: string,
  product_weight: string,
  productSKU: string,
  quantity: string,
  options: any
) {
  return {
    name,
    brand,
    product_dimension,
    product_weight,
    productSKU,
    quantity,
    options,
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
    ],
  };
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ border: "none" }}>
        <TableCell sx={{ border: "none" }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell sx={{ border: "none" }} align="left">
          {row.name}
        </TableCell>
        <TableCell sx={{ border: "none" }} align="left">
          {row.brand}
        </TableCell>
        <TableCell sx={{ border: "none" }} align="left">
          {row.product_dimension}
        </TableCell>
        <TableCell sx={{ border: "none" }} align="left">
          {row.product_weight}
        </TableCell>
        <TableCell sx={{ border: "none" }} align="left">
          {row.productSKU}
        </TableCell>
        <TableCell sx={{ border: "none" }} align="left">
          {row.quantity}
        </TableCell>
        <TableCell sx={{ border: "none" }} align="left">
          {row.options}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1, padding: "2rem 1rem" }}>
              <Typography variant="h6" gutterBottom component="div">
                Detalhes do produto
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Fornecedor</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="right">Valor atual do produto</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="center">
                        <StatusProduct>
                          <div className="circle-button"></div>
                          <p>Ativo</p>
                        </StatusProduct>
                      </TableCell>
                      <TableCell align="right">
                        <strong>R$ 12.988</strong> ou 12x de{" "}
                        <strong>R$ 1.093</strong> com x% de juros
                      </TableCell>
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

interface IProducts {
  invetoryProducts: any[];
}

function InventoryTable({ invetoryProducts }: IProducts) {
  function handleChangePage(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    page: number
  ): void {
    console.log(event, page);
    throw new Error("Function not implemented.");
  }



  return (
    <InventoryTableRootContainer>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell align="left">#&nbsp;</TableCell>
              <TableCell align="left">Nome</TableCell>
              <TableCell align="left">Fabricante</TableCell>
              <TableCell align="left">Dimensões</TableCell>
              <TableCell align="left">Peso Total</TableCell>
              <TableCell align="left">Código (SKU)</TableCell>
              <TableCell align="left">Quantidade</TableCell>
              <TableCell align="left">Opções</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invetoryProducts.map((product: any) => (
              <Row
                key={product.id}
                row={{
                  name: product.Fabricante,
                  brand: product.Marca,
                  productSKU: product.Codigo,
                  quantity: product.Quantidade_em_estoque,
                  product_dimension: product.Dimensoes_do_pacote,
                  product_weight: product.Peso_do_produto,
                  options: (
                    <ActionsBoxWrapper>
                      <div className="action">
                        <DeleteIcon
                          sx={{
                            color: "rgb(60, 60, 60)",
                            width: "20px",
                            height: "20px",
                          }}
                        />
                      </div>
                    </ActionsBoxWrapper>
                  ),
                  history: [
                    {
                      date: "2020-01-05",
                      customerId: "11091700",
                      amount: 3,
                    },
                    {
                      date: "2020-01-02",
                      customerId: "Anonymous",
                      amount: 1,
                    },
                  ],
                }}
              />
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={12}
          rowsPerPage={12}
          page={12312}
          onPageChange={handleChangePage}
        />
      </TableContainer>
    </InventoryTableRootContainer>
  );
}

export default InventoryTable;
