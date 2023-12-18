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
import DeleteIcon from '@mui/icons-material/Delete';  
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useAxios } from "../../../../providers/AxiosProvider";
import { useAuth } from "../../../../contexts/AuthenticateContext";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Button, InputBase, Typography } from "@mui/material";
import { ContainerGeneralPackageList } from "../../../Global/GeneralPackageList/styles";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CategoryIcon from "@mui/icons-material/Category";
import ModalAddUser from "../PanelAddNewUser/ModalAddUser";
import { BoxActions } from "./styles";

function TableEmployee() {
  const [employees, setDataEmployee] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          `/employer-management/find/all/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response.data)
        setDataEmployee(response.data); // Assumindo que a resposta contém um array de objetos com os dados dos funcionários
      } catch (error) {
        console.error("Erro ao buscar funcionários", error);
      }
    };

    fetchData();
  }, []);
  const { axiosInstance } = useAxios();
  const { id } = useAuth();
  const token = localStorage.getItem("c__token");

  const getAllEmployees = async () => {
    const employers = await axiosInstance.get(
      `/employer-management/find/all/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(employers);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <>
      <ModalAddUser open={open} handleClose={handleCloseModal} />
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
              placeholder="Digite o nome do fornecedor"
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
            onClick={handleOpenModal}
            startIcon={<CategoryIcon />}
            variant="contained"
            sx={{
              height: "3rem",
            }}
          >
            Adicionar funcionario
          </Button>
        </div>
      </ContainerGeneralPackageList>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Nome do funcionário</TableCell>
              <TableCell align="center">RG</TableCell>
              <TableCell align="center">CPF</TableCell>
              <TableCell align="center">Telefone</TableCell>
              <TableCell align="center">Supervisor</TableCell>
              <TableCell align="center">Cargo</TableCell>
              <TableCell align="center">Código do funcionario</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee: any) => (
              <React.Fragment key={employee.id}>
                <TableRow >
                  <TableCell>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => setOpen(!open)}
                    >
                      {open ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">{employee.name + ' ' + employee.last_name}</TableCell>
                  <TableCell align="center">{employee.RG}</TableCell>
                  <TableCell align="center">{employee.CPF}</TableCell>
                  <TableCell align="center">{employee.phone}</TableCell>
                  <TableCell align="center">{employee.employee_supervisor}</TableCell>
                  <TableCell align="center">{employee.position}</TableCell>
                  <TableCell align="center">{employee.numberJob}</TableCell>
                  <TableCell align="center">
                    <BoxActions>
                      <DeleteIcon sx={{ width: '25px', height: '25px', color: 'rgb(80, 80, 80)' }} />
                      <EditNoteIcon sx={{ width: '25px', height: '25px', color: 'rgb(80, 80, 80)' }} />
                    </BoxActions>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                  >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                      <Box sx={{ margin: 1 }}>
                        {/* Adicione detalhes adicionais aqui se necessário */}
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default TableEmployee;
