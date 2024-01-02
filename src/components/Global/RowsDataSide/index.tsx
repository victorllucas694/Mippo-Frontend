import { RowsData } from "./styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import * as React from "react";

interface IRows {
  orderTracking: any[];
}

function RowsDataSide({ orderTracking }: IRows) {
  return (
    <>
      <RowsData>
        <img
          src="https://img.freepik.com/vetores-premium/nenhuma-ilustracao-do-conceito-de-dados_86047-486.jpg?w=996"
          alt=""
        />
      </RowsData>
      você ainda não tem pedidos aceitos
    </>
  );
}

export default RowsDataSide;
