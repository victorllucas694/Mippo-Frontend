import {
  InventoryTableRootContainer,
} from "./styles";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TablePagination } from "@mui/material";
import { ActionsBoxWrapper } from "../../Dashboard/Products/Suppliers/styles";
import DeleteIcon from "@mui/icons-material/Delete";

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
  };
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;

  return (
    <React.Fragment>
      <TableRow sx={{padding: '1rem', border: "1px solid rgb(230, 230, 230);" }}>
        <TableCell sx={{ border: "none" }}>

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
        <TableCell sx={{ border: "none" }} align="justify">
          {row.quantity}
        </TableCell>
        <TableCell sx={{ border: "none" }} align="justify">
          {row.options}
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
              <TableCell align="left"></TableCell>
              <TableCell align="left">Nome</TableCell>
              <TableCell align="left">Fabricante</TableCell>
              <TableCell align="left">Dimensões</TableCell>
              <TableCell align="left">Peso Total</TableCell>
              <TableCell align="left">Código (SKU)</TableCell>
              <TableCell align="left">Quantidade</TableCell>
              <TableCell align="center">Opções</TableCell>
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
                  )
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
