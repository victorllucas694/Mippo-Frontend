import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useAxios } from "../../../providers/AxiosProvider";
import { useAuth } from "../../../contexts/AuthenticateContext";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface Column {
  id:
    | "Nome_do_pacote"
    | "Codigo_do_pacote"
    | "Categoria_do_Pacote"
    | "Modelo_do_pacote"
    | "Distribuidor"
    | "Descricao"
    | "Nome_do_fornecedor"
    | "Estado_do_produto"
    | "Editar"
    | "Deletar";
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
  Descricao: string;
  Nome_do_fornecedor: string;
  Estado_do_produto: string;
}

interface IPackageDataType {
  User_Id: number;
  brand: string;
  categories: string;
  code: string;
  description: string;
  products_state: string;
  supplier_name: string;
  id: number;
  min_price: string;
  model_product: string;
  product_name: string;
}
let rows: any = [];

function TableProducts() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [renderDataPackages, setRenderDataPackages] = React.useState<
    IPackageDataType[] | null
  >(null);

  const { axiosInstance } = useAxios();
  const { id } = useAuth();

  React.useEffect(() => {
    getListAllProductsToRender();
  }, [id, renderDataPackages, rows]);

  const deleteAllProductsAndPackageByDropCode = async (dropCode: any) => {
    const token = localStorage.getItem("c__token");
    const deletePackageAndAllProducts = await axiosInstance.get(
      `products-management/delete/all/products/package/${id}/${dropCode}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(deletePackageAndAllProducts)
  };

  const getListAllProductsToRender = async () => {
    const token = localStorage.getItem("c__token");
    const foundedAllProductsByCategory = await axiosInstance(
      `products-management/get/all/products/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setRenderDataPackages(foundedAllProductsByCategory.data);
    if (rows.length <= 0) {
      foundedAllProductsByCategory.data.package.map(
        (packageData: IPackageDataType) => {
          console.log(packageData);
          rows.push(
            createData(
              packageData.product_name,
              packageData.code,
              packageData.categories,
              packageData.model_product,
              packageData.supplier_name,
              packageData.description,
              packageData.products_state,
              packageData.products_state
            )
          );
        }
      );
    }
  };

  const columns: readonly Column[] = [
    { id: "Nome_do_pacote", label: "Nome", minWidth: 170 },
    { id: "Codigo_do_pacote", label: "Codigo", minWidth: 100 },
    {
      id: "Categoria_do_Pacote",
      label: "Categoria",
      minWidth: 170,
      align: "right",
      format: (value: number) => value.toLocaleString("en-US"),
    },
    {
      id: "Modelo_do_pacote",
      label: "Modelo",
      minWidth: 170,
      align: "right",
      format: (value: number) => value.toFixed(2),
    },
    {
      id: "Distribuidor",
      label: "Distribuidor",
      minWidth: 170,
      align: "right",
      format: (value: number) => value.toFixed(2),
    },
    {
      id: "Descricao",
      label: "Descrição",
      minWidth: 170,
      align: "right",
      format: (value: number) => value.toFixed(2),
    },
    {
      id: "Estado_do_produto",
      label: "Estado do Produto",
      minWidth: 170,
      align: "right",
      format: (value: number) => value.toFixed(2),
    },
    {
      id: "Editar",
      label: "Editar pacote",
      minWidth: 200,
      align: "right",
      format: (value: number) => value.toString(),
      render: (row: any) => (
        <Button
          onClick={() => deleteAllProductsAndPackageByDropCode(row)}
          sx={{
            width: "70%",
            height: "2.5rem",
            fontSize: ".85rem",
            backgroundColor: "rgb(249, 249, 249)",
            color: "black",
            border: "1px solid rgb(230, 230, 230)",
            boxShadow: "3px 3px 15px -8px rgb(200, 200, 200)",
            "&:hover": {
              backgroundColor: "rgb(240, 240, 240)",
              color: "black",
            },
          }}
          variant="contained"
        >
          Editar
        </Button>
      ),
    },
    {
      id: "Deletar",
      label: "Deletar do pacote",
      minWidth: 200,
      align: "right",
      format: (value: number) => value.toString(),
      render: (row: any) => (
        <Button
          onClick={() => deleteAllProductsAndPackageByDropCode(row)}
          startIcon={<DeleteIcon />}
          sx={{
            width: "70%",
            height: "2.5rem",
            fontSize: ".85rem",
          }}
          variant="contained"
          color="error"
        >
          Deletar
        </Button>
      ),
    },
  ];

  function createData(
    Nome_do_pacote: string,
    Codigo_do_pacote: string,
    Categoria_do_Pacote: string,
    Modelo_do_pacote: string,
    Distribuidor: string,
    Descricao: string,
    Nome_do_fornecedor: string,
    Estado_do_produto: string
  ): IPackageData {
    return {
      Nome_do_pacote,
      Codigo_do_pacote,
      Categoria_do_Pacote,
      Modelo_do_pacote,
      Distribuidor,
      Descricao,
      Nome_do_fornecedor,
      Estado_do_produto,
    };
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    console.log(event)
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
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
  );
}

export default TableProducts;
