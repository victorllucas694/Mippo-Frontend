import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TablePagination from "@mui/material/TablePagination";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAxios } from "../../../../../providers/AxiosProvider";
import { useAuth } from "../../../../../contexts/AuthenticateContext";

interface UserData {
  admin: string;
  create_date_time: string;
  email: string;
  id: number;
  last_changed_date_time: string;
  last_name: string;
  name: string;
  password: string;
  phone: string;
}

interface Column {
  id: keyof UserData | "actions";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: string) => string;
}

const columns: readonly Column[] = [
  { id: "id", label: "ID" },
  { id: "name", label: "Name" },
  { id: "last_name", label: "Last Name" },
  { id: "email", label: "Email" },
  { id: "phone", label: "Phone" },
  { id: "admin", label: "Admin" },
  {
    id: "create_date_time",
    label: "Created At",
    minWidth: 200,
    format: (value: string) => new Date(value).toLocaleString(),
  },
  {
    id: "last_changed_date_time",
    label: "Last Changed At",
    minWidth: 200,
    format: (value: string) => new Date(value).toLocaleString(),
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 100,
    align: "center",
    format: () => "", // Empty string, as we will render custom content in TableBody
  },
];

export default function UsersTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [userRows, setUserRows] = useState<UserData[]>([]);
  const { axiosInstance } = useAxios();
  const { id } = useAuth();

  useEffect(() => {
    getAllUserData();
  }, []);

  const getAllUserData = async () => {
    try {
      const token = localStorage.getItem("c__token");
      const response = await axiosInstance.get(
        `/admin-customer-manager/get/all/costumers/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserRows(response.data);
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  const handleViewClick = async (userId: number) => {};

  const handleDeleteClick = async (userId: number) => {

    console.log(userId)
    try {
      const token = localStorage.getItem("c__token");
      const response = await axiosInstance.get(
        `/admin-customer-manager/delete/user/${id}/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);

      if (response.data) {
        setUserRows((prev) => [...prev.filter((i) => i.id !== userId)]);
      }
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {userRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.id.toString()}
                >
                  {columns.map((column) => {
                    const value = row[column.id];
                    if (column.id === "actions") {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          <RemoveRedEyeIcon
                            style={{
                              color: "rgb(80, 80, 80)",
                              height: "18px",
                              width: "18px",
                              cursor: "pointer",
                              marginRight: 8,
                            }}
                            onClick={() => handleViewClick(row.id)}
                          />
                          <DeleteIcon
                            style={{
                              color: "rgb(80, 80, 80)",
                              height: "18px",
                              width: "18px",
                              cursor: "pointer",
                            }}
                            onClick={() => handleDeleteClick(row.id)}
                          />
                        </TableCell>
                      );
                    }
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format ? column.format(value as string) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={userRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
