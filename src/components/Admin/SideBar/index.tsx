import {
  BoxDashPanel,
  ContainerWrapperFlex,
  HeaderBoxDashboardPanel,
  TitleAdmin,
} from "./styles";
import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Typography from "@mui/material/Typography";
import Events from "./AdminBoxMainContent/Events";
import Goals from "./AdminBoxMainContent/Goals";
import Members from "./AdminBoxMainContent/Members";
import { usePagesManagement } from "../../../contexts/PagesManagementContext";
import AdminPagesManagement from "../AdminPagesManagement";
import { ExpandLess } from "@mui/icons-material";
import Collapse from "@mui/material/Collapse";
import ExpandMore from "@mui/icons-material/ExpandMore";
import CategoryIcon from "@mui/icons-material/Category";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import CreateNewProduct from "../Dashboard/Products/CreateNewProduct";
import UpdateProduct from "../AdminPagesManagement/UpdateProduct";
import GeneralPackageList from "../../Global/GeneralPackageList";
import Suppliers from "../Dashboard/Products/Suppliers";
import ProductsOrderTickets from "../ProductsOrderTickets";
import PanelAddNewUser from "../UserManagement/PanelAddNewUser";
import InventoryIcon from "@mui/icons-material/Inventory";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import InventaryByCategory from "../InventoryByCategory";
import TableEmployee from "../UserManagement/TableEmployee";
import { Badge } from "@mui/material";
import AlertLowerStock from "../AlertLowerStock";
import OrderTracking from "../OrderTracking";
  
const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

interface IComponentManagement {
  label: string;
  detailPage: string;
}

function SideBar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const componentManagement: IComponentManagement[] = [
    {
      label: "Banner",
      detailPage: "Banner",
    },
    {
      label: "Card do produto",
      detailPage: "Card",
    },
    {
      label: "Logo",
      detailPage: "brand",
    },
    {
      label: "Barra de navegação",
      detailPage: "navbar",
    },
  ];

  const componentOrderManagement: IComponentManagement[] = [
    {
      label: "Pedidos dos clientes",
      detailPage: "ProductTicket",
    },
    {
      label: "Lista de fornecedores",
      detailPage: "SupplierList",
    },
    {
      label: "Rastreamento dos pedidos",
      detailPage: "getLocaleProduct",
    },
    {
      label: "Etiquetas de remessa",
      detailPage: "ProductTicket",
    },
  ];

  const componentProductStock: IComponentManagement[] = [
    {
      label: "Computadores",
      detailPage: "ComputadoresStock",
    },
    {
      label: "Notebook",
      detailPage: "NotebooksStock",
    },
    {
      label: "Acessorios",
      detailPage: "AcessoriosStock",
    },
    {
      label: "Hardware",
      detailPage: "AcessoriosStock",
    },
  ];

  const componentManagementProduct: IComponentManagement[] = [
    {
      label: "Importação de pacotes",
      detailPage: "AddProduct",
    },
    {
      label: "Abrir Pacotes",
      detailPage: "OpenProduct",
    },
  ];

  const componentManagementUsers: IComponentManagement[] = [
    {
      label: "clientes",
      detailPage: "AddNewUser",
    },
    {
      label: "Funcionarios",
      detailPage: "Employee",
    },
  ];

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [openList, setOpenLits] = React.useState(false);

  const handleOpenListClick = () => {
    setOpenLits(!openList);
  };

  const [openListProducts, setOpenLitsProducts] = React.useState(false);

  const handleOpenListProducts = () => {
    setOpenLitsProducts(!openListProducts);
  };

  const [openListUsers, setOpenListUsers] = React.useState(false);

  const handleOpenListUsers = () => {
    setOpenListUsers(!openListUsers);
  };

  const [openListStock, setOpenListStock] = React.useState(false);

  const handleOpenListStock = () => {
    setOpenListStock(!openListStock);
  };

  const [categoryName, setCategoryName] = React.useState<string>("");

  const setProductCategory = (category: string) => {
    setCategoryName(category);
  };

  const [openListManagement, setOpenListManagement] = React.useState(false);

  const handleOpenListManagement = () => {
    setOpenListManagement(!openListManagement);
  };

  const [lowerStock, setLowerStock] = React.useState<string>("");

  const handleOpenAlertProductStock = () => {
    setLowerStock("lowerStock");
  };

  const backToHomePage = () => {
    localStorage.removeItem("c__token");
    window.location.href = "/";
  };

  const { pageName, setPageName } = usePagesManagement();

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            boxShadow: "none",
          }}
          open={open}
        >
          <Toolbar
            sx={{
              backgroundColor: "rgb(255, 255, 255)",
              boxShadow: "none",
              border: "1px solid rgb(230, 230, 230)",
            }}
          >
            <IconButton
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <HeaderBoxDashboardPanel>
              <TitleAdmin>Painel administrativo</TitleAdmin>
              <Button
                sx={{ height: "3rem" }}
                onClick={backToHomePage}
                variant="outlined"
              >
                Sair da conta
              </Button>
            </HeaderBoxDashboardPanel>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <img
              style={{ width: "100%" }}
              src="https://img.freepik.com/free-vector/branding-identity-corporate-vector-logo-design_460848-8717.jpg?w=1380&t=st=1695394137~exp=1695394737~hmac=7fb024e8fca3923032fb13abfbb6a69979428b9cb603d67a8439f278c3d1f166"
            />
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          {open ? (
            <Typography
              sx={{
                margin: "1rem",
              }}
            >
              Gerenciamento
            </Typography>
          ) : null}

          <List>
            <ListItemButton onClick={handleOpenListUsers}>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Usuários" />
              {openListUsers ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openListUsers} timeout="auto" unmountOnExit>
              {componentManagementUsers.map(
                (component: IComponentManagement) => {
                  return (
                    <List
                      component="div"
                      onClick={() => setPageName(component.detailPage)}
                      disablePadding
                    >
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary={component.label} />
                      </ListItemButton>
                    </List>
                  );
                }
              )}
            </Collapse>
            <ListItemButton onClick={handleOpenListStock}>
              <ListItemIcon>
                <PrecisionManufacturingIcon />
              </ListItemIcon>
              <ListItemText primary="Estoque" />
              {openListStock ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openListStock} timeout="auto" unmountOnExit>
              {componentProductStock.map((component: IComponentManagement) => {
                return (
                  <List
                    component="div"
                    onClick={() => {
                      setPageName(component.detailPage);
                      setCategoryName(component.label);
                    }}
                    disablePadding
                  >
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText primary={component.label} />
                    </ListItemButton>
                  </List>
                );
              })}
            </Collapse>
            <ListItemButton onClick={handleOpenListManagement}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Gerenciamento" />
              {openListManagement ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openListManagement} timeout="auto" unmountOnExit>
              {componentOrderManagement.map(
                (component: IComponentManagement) => {
                  return (
                    <List
                      component="div"
                      onClick={() => setPageName(component.detailPage)}
                      disablePadding
                    >
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary={component.label} />
                      </ListItemButton>
                    </List>
                  );
                }
              )}
            </Collapse>
            <ListItemButton onClick={handleOpenListProducts}>
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary="Produtos" />
              {openListProducts ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openListProducts} timeout="auto" unmountOnExit>
              {componentManagementProduct.map(
                (component: IComponentManagement) => {
                  return (
                    <List
                      component="div"
                      onClick={() => setPageName(component.detailPage)}
                      disablePadding
                    >
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary={component.label} />
                      </ListItemButton>
                    </List>
                  );
                }
              )}
            </Collapse>
            <ListItemButton onClick={handleOpenListClick}>
              <ListItemIcon>
                <FolderCopyIcon />
              </ListItemIcon>
              <ListItemText primary="Componentes" />
              {openList ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openList} timeout="auto" unmountOnExit>
              {componentManagement.map((component: IComponentManagement) => {
                return (
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText primary={component.label} />
                    </ListItemButton>
                  </List>
                );
              })}
            </Collapse>
          </List>
          <Divider />
          {open ? (
            <Typography
              sx={{
                margin: "1rem",
              }}
            >
              Alertas e alterações
            </Typography>
          ) : null}

          <List>
            {["Avisos", "Listagem", "Modificações"].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  {text === "Avisos" ? (
                    <Badge
                      onClick={() => setPageName("lowerStock")}
                      badgeContent={4}
                      color="error"
                    >
                      <ListItemIcon
                        onClick={() => setPageName("lowerStock")}
                        sx={{
                          minWidth: 0,
                          justifyContent: "center",
                        }}
                      >
                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                      </ListItemIcon>
                    </Badge>
                  ) : text === "Listagem" ? (
                    <Badge badgeContent={1} color="error">
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          justifyContent: "center",
                        }}
                      >
                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                      </ListItemIcon>
                    </Badge>
                  ) : (
                    <Badge badgeContent={0} color="error">
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          justifyContent: "center",
                        }}
                      >
                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                      </ListItemIcon>
                    </Badge>
                  )}
                  <ListItemText
                    primary={text}
                    sx={{ margin: open ? "0 2rem" : "", opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        >
          <Toolbar />
          {pageName === "Main" ? (
            <>
              <ContainerWrapperFlex>
                <div className="flex-col-4">
                  <BoxDashPanel>
                    <Events />
                  </BoxDashPanel>
                </div>
                <div className="flex-col-8">
                  <BoxDashPanel>
                    <Goals />
                  </BoxDashPanel>
                </div>
              </ContainerWrapperFlex>
              <ContainerWrapperFlex>
                <div className="flex-col-12">
                  <Members />
                </div>
              </ContainerWrapperFlex>
            </>
          ) : pageName === "AddProduct" ? (
            <>
              <CreateNewProduct />
            </>
          ) : pageName === "SupplierList" ? (
            <Suppliers foundedPackage={null} ISupplierTable={null} />
          ) : pageName === "UpdateProduct" ? (
            <UpdateProduct />
          ) : pageName === "OpenProduct" ? (
            <GeneralPackageList />
          ) : pageName === "ProductTicket" ? (
            <ProductsOrderTickets />
          ) : pageName === "AddNewUser" ? (
            <PanelAddNewUser />
          ) : pageName === "ComputadoresStock" ? (
            <InventaryByCategory
              productName={categoryName}
              pageName={pageName}
            />
          ) : pageName === "NotebooksStock" ? (
            <InventaryByCategory
              productName={categoryName}
              pageName={pageName}
            />
          ) : pageName === "AcessoriosStock" ? (
            <InventaryByCategory
              productName={categoryName}
              pageName={pageName}
            />
          ) : pageName === "HardwareStock" ? (
            <InventaryByCategory
              productName={categoryName}
              pageName={pageName}
            />
          ) : pageName === "lowerStock" ? (
            <AlertLowerStock />
          ) : pageName === "Employee" ? (
            <TableEmployee />
          ) : pageName === "getLocaleProduct" ? (
            <OrderTracking />
          ) : (
            <AdminPagesManagement />
          )}
        </Box>
      </Box>
    </>
  );
}

export default SideBar;
