import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAxios } from "../../../../../providers/AxiosProvider";
import { useAuth } from "../../../../../contexts/AuthenticateContext";
import {
  ContainerGeneralPackageList,
  ListPackageData,
} from "../../../../Global/GeneralPackageList/styles";
import InputBase from "@mui/material/InputBase";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import CategoryIcon from "@mui/icons-material/Category";
import ModalAddNewSupplier from "./ModalAddNewSupplier";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { TicketsManagement } from "../../../ProductsOrderTickets/styles";
import AddCardIcon from "@mui/icons-material/AddCard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { ActionsBoxWrapper } from "./styles";
import { StatusProduct } from "../../../InventoryByCategory/InventoryTable/styles";

interface Column {
  id:
    | "name"
    | "phone"
    | "NIF"
    | "shipping_method"
    | "Editar"
    | "Deletar"
    | "status";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
  render?: (value: number, row: any) => JSX.Element;
}

interface IPackageData {
  Nome_do_pacote: string;
  Codigo_do_pacote: string;
  Categoria_do_Pacote: string;
  Modelo_do_pacote: string;
  Distribuidor: string;
  Estado_do_Produto: string;
}

interface IPackageDataType {
  User_Id: number;
  drop_brand: string;
  drop_categories: string;
  drop_code: string;
  drop_description: string;
  drop_products_state: string;
  drop_seller: string;
  id: number;
  min_price: string;
  model_product: string;
  product_name: string;
}

interface ISupplierTable {
  NIF: string;
  name: string;
  phone: string;
  shipping_method: string;
  status: string;
}

let rows: ISupplierTable[] = [];

interface ChildProps {
  foundedPackage: IPackageDataType[] | null;
  ISupplierTable: IPackageDataType[] | null;
}

function Suppliers({ foundedPackage }: ChildProps) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const [renderDataPackages, setRenderDataPackages] = React.useState<
    IPackageDataType[] | null
  >(null);
  const [suppliersArrData, setSuppliersArrData] = React.useState<
    ISupplierTable[] | null
  >(null);
  const token = localStorage.getItem("c__token");
  const { axiosInstance } = useAxios();
  const { id } = useAuth();

  React.useEffect(() => {
    if (rows.length <= 0) {
      getListAllProductsToRender();
      getAllSuppliersByUserId();
    }
  }, [id, suppliersArrData]);

  const deleteAllProductsAndPackageByDropCode = async (dropCode: any) => {
    const deletePackageAndAllProducts = await axiosInstance.get(
      `products-management/delete/all/products/package/${id}/${dropCode}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  const [activeSuppliers, setActiveSuppliers] = React.useState<number>(0);

  const getListAllProductsToRender = async () => {
    const foundedAllProductsByCategory = await axiosInstance(
      `/suppliers-management/get/all/suppliers/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(foundedAllProductsByCategory.data);
    setActiveSuppliers(foundedAllProductsByCategory.data.length);
    console.log(activeSuppliers);
    setSuppliersArrData(foundedAllProductsByCategory.data);

    if (foundedAllProductsByCategory.data) {
      foundedAllProductsByCategory.data.map((suppliersData: ISupplierTable) => {
        if (suppliersData.NIF) {
          rows.push(
            createData(
              suppliersData.name,
              suppliersData.phone,
              suppliersData.NIF,
              suppliersData.shipping_method,
              "Ativo"
            )
          );
        }
      });
    }
  };
  const columns: readonly Column[] = [
    { id: "name", label: "Nome do fornecedor", minWidth: 170 },
    {
      id: "phone",
      label: "Telefone do fornecedor",
      minWidth: 200,
    },
    {
      id: "NIF",
      label: "NIF do fornecedor",
      minWidth: 180,
      align: "right",
      format: (value: number) => value.toLocaleString("pt-BR"),
    },
    {
      id: "shipping_method",
      label: "Metode de entrega",
      minWidth: 180,
      align: "right",
      format: (value: number) => value.toFixed(2),
    },
    {
      id: "status",
      label: "status",
      minWidth: 180,
      format: (value: number) => value.toFixed(2),
      render: (value: number, row: any) => (
        <ActionsBoxWrapper>
          <StatusProduct>
            <div className="circle-button"></div>
            <p>Ativo</p>
          </StatusProduct>
        </ActionsBoxWrapper>
      ),
    },
    {
      id: "Deletar",
      label: "Deletar do pacote",
      minWidth: 180,
      align: "right",
      format: (value: number) => value.toString(),
      render: (value: number, row: any) => (
        <ActionsBoxWrapper>
          <div className="buttons-actions">
            <div className="action">
              <BorderColorIcon
                sx={{ color: "rgb(60, 60, 60)", width: "20px", height: "20px" }}
              />
            </div>
            <div className="action">
              <DeleteIcon
                sx={{ color: "rgb(60, 60, 60)", width: "20px", height: "20px" }}
              />
            </div>
          </div>
        </ActionsBoxWrapper>
      ),
    },
  ];

  function createData(
    name: string,
    phone: string,
    NIF: string,
    shipping_method: string,
    status: string
  ): ISupplierTable {
    return {
      name,
      phone,
      NIF,
      shipping_method,
      status,
    };
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [isOpen, setIsOpen] = React.useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  interface TicketsData {
    label: string;
    number: number;
    percent: number;
  }
  const getAllSuppliersByUserId = async () => {
    const sendSupplierBasicDataPayload = await axiosInstance.get(
      `/suppliers-management/get/all/suppliers/${id}`
    );
  };
  const TicketsData: TicketsData[] = [
    {
      label: "Fornecedores ativos",
      number: activeSuppliers,
      percent: 0,
    },
    {
      label: "Participação dos fornecedores",
      number: 4,
      percent: 0,
    },
    {
      label: "Custos totais sobre os fornecedores",
      number: 9000.99,
      percent: 0,
    },
  ];
  return (
    <>
      <ModalAddNewSupplier
        isOpen={isOpen}
        handleOpen={handleOpen}
        handleClose={handleClose}
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
              placeholder="e do fornecedor"
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
          <Button
            onClick={handleOpen}
            startIcon={<CategoryIcon />}
            variant="contained"
            sx={{
              height: "3rem",
            }}
          >
            Adicionar fornecedor
          </Button>
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
                  <h1>{order.number}</h1>
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
        <ListPackageData>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 880 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        sx={{
                          textAlign: "center",
                        }}
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                {rows.length === 0 ? (
                  <TableRow>
                    {" "}
                    <p style={{ margin: "1rem 2rem", position: "absolute" }}>
                      Não há dados disponíveis.
                    </p>
                  </TableRow>
                ) : (
                  rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: any) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.code}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell
                                sx={{
                                  textAlign: "center",
                                }}
                                key={column.id}
                                align={column.align}
                              >
                                {column.render
                                  ? column.render(value, row.Codigo_do_pacote)
                                  : column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })
                )}
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[20, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </ListPackageData>
      </ContainerGeneralPackageList>
    </>
  );
}

export default Suppliers;
