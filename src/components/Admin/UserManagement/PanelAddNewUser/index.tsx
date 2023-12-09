import { ContainerGeneralPackageList } from "../../../Global/GeneralPackageList/styles";
import Paper from "@mui/material/Paper";
import { Button, IconButton } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import CategoryIcon from "@mui/icons-material/Category";
import UsersTable from "./UsersTable";

function PanelAddNewUser() {
  return (
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
            placeholder="Digite o nome do usuário"
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
          Filtrar por ID
        </Button>
        <Button
          startIcon={<CategoryIcon />}
          variant="contained"
          sx={{
            height: "3rem",
          }}
        >
          Adicionar novo usuário
        </Button>
      </div>

      <UsersTable />
    </ContainerGeneralPackageList>
  );
}

export default PanelAddNewUser;
