import { Button } from "@mui/material";
import { BoxOrderUser } from "./styles";
import * as React from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SellIcon from "@mui/icons-material/Sell";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import { useAxios } from "../../../providers/AxiosProvider";
import { useAuth } from "../../../contexts/AuthenticateContext";

interface Data {
  id: number;
  quantidade: number;
  valor_a_vista: number;
  fabricante: number;
  produto: string;
  valor_a_prazo: number;
}

function createData(
  id: number,
  produto: string,
  quantidade: number,
  fabricante: number,
  valor_a_vista: number,
  valor_a_prazo: number
): Data {
  return {
    id,
    produto,
    quantidade,
    fabricante,
    valor_a_vista,
    valor_a_prazo,
  };
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}
const headCells: readonly HeadCell[] = [
  {
    id: "produto",
    numeric: false,
    disablePadding: true,
    label: "Descrição do produto",
  },
  {
    id: "fabricante",
    numeric: true,
    disablePadding: false,
    label: "Fabricante",
  },
  {
    id: "quantidade",
    numeric: true,
    disablePadding: false,
    label: "Quantidade",
  },
  {
    id: "valor_a_vista",
    numeric: true,
    disablePadding: false,
    label: "Valor a vista",
  },
  {
    id: "valor_a_prazo",
    numeric: true,
    disablePadding: false,
    label: "Valor a prazo",
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
interface EnhancedTableToolbarProps {
  numSelected: number;
}
function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props;
  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
        numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        },
      ]}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Tabela de pedidos
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

function OrdersUser() {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("produto");
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState<Data[]>([]);
  const { axiosInstance } = useAxios();
  const { id } = useAuth();
  const [totalValorAVista, setTotalValorAVista] = React.useState<number>(0);
  const [totalItems, setTotalItems] = React.useState<number>(0);
  const [totalSum, setTotalSum] = React.useState<number>(0);
  const [formattedTotalData, setFormattedTotalData] = React.useState<string>("");


  React.useEffect(() => {
    const token = localStorage.getItem("c__token");

    async function getAllOrdersByUserId() {
      try {
        const response = await axiosInstance.get(
          `/order-management/get/all/user/orders/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const orders = response.data || [];

        const formattedOrders = orders.map((order: any) => ({
          id: order.id,
          produto:
            order.additionalOrders?.Descricao_final_sobre_o_produto ||
            "Descrição não disponível",
          quantidade: order.id_pedido || 0,
          fabricante:
            order.additionalOrders?.Fabricante || "Fabricante desconhecido",
          valor_a_vista: parseFloat(
            order.additionalOrders?.Valor_a_vista || "0"
          ),
          valor_a_prazo: order.additionalOrders?.Valor_a_prazo,
        }));

        setRows(formattedOrders);
        setTotalItems(formattedOrders.length);
        console.log(totalItems);
        let total = 0;
        formattedOrders.forEach((order: any) => {
          total += order.valor_a_vista;
          setTotalValorAVista((prev) => {
            const updatedTotal = prev + order.valor_a_vista;
            return updatedTotal;
          });
        });

        const formattedTotal = new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(total);
        setFormattedTotalData(formattedTotal);
        console.log("Soma total formatada:", formattedTotalData);
      } catch (error: any) {
        console.error(
          "Erro ao buscar pedidos do usuário:",
          error.message || error
        );
      }
    }

    getAllOrdersByUserId();
  }, [axiosInstance, id]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      [...rows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage]
  );

  const obterDataPorExtenso = (): string => {
    const dataAtual = new Date();

    const diaSemana = new Intl.DateTimeFormat("pt-BR", {
      weekday: "long",
    }).format(dataAtual);
    const mes = new Intl.DateTimeFormat("pt-BR", { month: "long" }).format(
      dataAtual
    );
    const ano = dataAtual.getFullYear();

    return `${diaSemana}, ${dataAtual.getDate()} de ${mes} de ${ano}`;
  };

  return (
    <BoxOrderUser>
      <div className="header-data-orders">
        <h1>Lista de pedidos</h1>

        <div style={{ display: "flex", gap: "1rem" }}>
          <Button
            variant="outlined"
            sx={{
              height: "3rem",
            }}
          >
            {"Mostrar estatisticas"}
          </Button>
          <Button
            variant="contained"
            sx={{
              height: "3rem",
            }}
          >
            {obterDataPorExtenso()}
          </Button>
        </div>
      </div>

      <div className="items-statiscs">
        <div className="box-statistic">
          <h1>Total a pagar</h1>
          <div className="body-box-statistic">
            <div className="icon-box">
              <CreditScoreIcon
                sx={{
                  width: "1.6rem",
                  height: "1.6r2m",
                  color: "rgb(120, 120, 120)",
                }}
              />
            </div>
            <h2>{formattedTotalData}</h2>
          </div>
        </div>
        <div className="box-statistic">
          <h1>items no carrinho</h1>
          <div className="body-box-statistic">
            <div className="icon-box">
              <ShoppingCartIcon
                sx={{
                  width: "1.6rem",
                  height: "1.6r2m",
                  color: "rgb(120, 120, 120)",
                }}
              />
            </div>
            <h2>{totalItems} items</h2>
          </div>
        </div>
        <div className="box-statistic">
          <h1>Compras Em andamento</h1>
          <div className="body-box-statistic">
            <div className="icon-box">
              <SellIcon
                sx={{
                  width: "1.6rem",
                  height: "1.6r2m",
                  color: "rgb(120, 120, 120)",
                }}
              />
            </div>
            <h2>{totalItems} items</h2>
          </div>
        </div>
        <div className="box-statistic">
          <h1>Compras finalizadas</h1>
          <div className="body-box-statistic">
            <div className="icon-box">
              <AssuredWorkloadIcon
                sx={{
                  width: "1.6rem",
                  height: "1.6r2m",
                  color: "rgb(120, 120, 120)",
                }}
              />
            </div>
            <h2>0 compras</h2>
          </div>
        </div>
      </div>
      <br />
      <Box sx={{ width: "100%" }}>
        <Paper
          sx={{
            width: "100%",
            mb: 2,
            boxShadow: "0px 1px 8px -1px rgb(220, 220, 220)",
          }}
        >
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {rows.map((row, index) => {
                  const isItemSelected = selected.includes(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell sx={{ padding: "1rem" }} padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.produto}
                    </TableCell>
                    <TableCell align="right">{row.fabricante}</TableCell>
                    <TableCell align="right">{row.quantidade}</TableCell>
                    <TableCell align="right">{row.valor_a_vista}</TableCell>
                    <TableCell align="right">{row.valor_a_prazo}</TableCell>
                  </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </BoxOrderUser>
  );
}

export default OrdersUser;
