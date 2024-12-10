import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import { AppProvider, type Navigation } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";

// Ícones
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LayersIcon from "@mui/icons-material/Layers";
import GradeIcon from "@mui/icons-material/Grade";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SecurityIcon from "@mui/icons-material/Security";

// Componentes
import Account from "./Account";
import OrdersUser from "./OrdersUser";
import OrderTimer from "./OrderTimer";
import OrdersSuccess from "./OdersSuccess";
import Options from "./Options";

// Navegação
const NAVIGATION: Navigation = [
  { kind: "header", title: "Usuário" },
  { segment: "account", title: "Minha conta", icon: <PersonIcon /> },
  { kind: "divider" },
  { kind: "header", title: "Análise" },
  {
    segment: "orders",
    title: "Pedidos",
    icon: <ShoppingCartIcon />,
    children: [
      { segment: "sales", title: "Lista de pedidos", icon: <GradeIcon /> },
      {
        segment: "timer",
        title: "Entregas em andamento",
        icon: <AccessTimeFilledIcon />,
      },
      {
        segment: "success",
        title: "Entregas concluídas",
        icon: <CheckCircleIcon />,
      },
    ],
  },
  { segment: "settings", title: "Configurações", icon: <LayersIcon /> },
];

// Tema personalizado
const demoTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

// Conteúdo da página com base no pathname
function PageContent({ pathname }: { pathname: string }) {
  switch (pathname) {
    case "/account":
      return <Account />;
    case "/orders/sales":
      return <OrdersUser />;
    case "/orders/timer":
      return <OrderTimer />;
    case "/orders/success":
      return <OrdersSuccess />;
    case "/settings":
      return <Options />;
    case "/security":
      return <Typography variant="h4">Segurança</Typography>;
    default:
      return <Account />;
  }
}

// Componente principal
interface SettingsProps {
  window?: () => Window;
}

export default function Settings({ window }: SettingsProps) {
  const router = useDemoRouter("/");
  const demoWindow = window?.() || undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      branding={{
        logo: (
          <img
            style={{ width: "4rem", height: "10rem" }}
            src="https://img.freepik.com/free-vector/branding-identity-corporate-vector-logo-design_460848-8717.jpg?w=1380&t=st=1695394137~exp=1695394737~hmac=7fb024e8fca3923032fb13abfbb6a69979428b9cb603d67a8439f278c3d1f166"
            alt="Brand logo"
          />
        ),
        title: "",
      }}
    >
      <DashboardLayout>
        <PageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}
