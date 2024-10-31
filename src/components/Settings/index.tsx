import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";
import { AppProvider, type Navigation } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import Account from "./Account";

const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "Usuário",
  },
  {
    segment: "account",
    title: "Minha conta",
    icon: <PersonIcon />,
  },
  {
    segment: "settings",
    title: "Configuração",
    icon: <SettingsIcon />,
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Análise",
  },
  {
    segment: "orders",
    title: "Pedidos",
    icon: <ShoppingCartIcon />,
    children: [
      {
        segment: "sales",
        title: "Rastrear pedido",
        icon: <DescriptionIcon />,
      },
      {
        segment: "traffic",
        title: "Meus pedidos",
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: "Support",
    title: "Suporte",
    icon: <LayersIcon />,
  },
];

const demoTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function PageContent({ pathname }: { pathname: string }) {
  return (
    <>
      {pathname === "/account" ? (
        <Account />
      ) : pathname === "/settings" ? (
        <h1>settings</h1>
      ) : (
        <Account />
      )}
    </>
  );
}

interface DemoProps {
  window?: () => Window;
}

export default function Settings(props: DemoProps) {
  const { window } = props;

  const router = useDemoRouter("/");

  const demoWindow = window !== undefined ? window() : undefined;

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
            alt="MUI logo"
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
