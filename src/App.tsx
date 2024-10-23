import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import HomePage from "./pages/Home";
import { ProductContextProvider } from "./contexts/CardContexts";
import Login from "./pages/Login";
import ProductDescription from "./pages/ProductDescription";
import { AxiosProvider, useAxios } from "./providers/AxiosProvider";
import { InputProvider } from "./contexts/UserInputOutput";
import { AuthProvider, useAuth } from "./contexts/AuthenticateContext";
import Dashboard from "./components/Admin/Dashboard";
import { PagesManagementProvider } from "./contexts/PagesManagementContext";
import { RequestsProductsProvider } from "./contexts/RequestsProductsContext";
import ProductByCategory from "./pages/ProductsByCategory";
import { MyContextProvider } from "./contexts/PaymentContext";
import { PaymentContextProvider } from "./contexts/payment";
import { FilterContextProvider } from "./contexts/FilterToProducts";
import Purchase from "./pages/Purchase";
import ProductsFiltred from "./pages/ProductsFiltred";
import UserSettings from "./pages/UserSettings";

function App() {
  return (
    <AxiosProvider>
      <FilterContextProvider>
        <MyContextProvider>
          <PaymentContextProvider>
            <RequestsProductsProvider>
              <AuthProvider>
                <InputProvider>
                  <PagesManagementProvider>
                    <Router>
                      <ProductContextProvider>
                        <GlobalStyles />
                        <AppContent />
                      </ProductContextProvider>
                    </Router>
                  </PagesManagementProvider>
                </InputProvider>
              </AuthProvider>
            </RequestsProductsProvider>
          </PaymentContextProvider>
        </MyContextProvider>
      </FilterContextProvider>
    </AxiosProvider>
  );
}

function AppContent() {
  const { axiosInstance } = useAxios();
  const { setUserId } = useAuth();
  const [userAllowed, setUserAllowed] = useState<boolean>(false);
  const [userCommonAllowed, setUserCommonAllowed] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function callEndpointToVerifyJwt() {
      const c_tokenData = localStorage.getItem("c__token");
      if (c_tokenData) {
        try {
          const req = await axiosInstance.get("/authenticate/token-verify", {
            headers: {
              Authorization: `Bearer ${c_tokenData}`,
            },
          });

          if (req.data.admin === "true") {
            setUserAllowed(true);
          } else {
            setUserAllowed(false);
          }

          setUserId(req.data.id);
        } catch (error) {
          console.error("Token inválido, removendo do localStorage.", error);
          localStorage.removeItem("c__token");
          setUserAllowed(false);
          navigate("/");
        }
      }
    }
    async function callEndpointToVerifyJwtToCommonUser() {
      const c_tokenData = localStorage.getItem("c__token");
      if (c_tokenData) {
        try {
          const req = await axiosInstance.get("/authenticate/token-verify", {
            headers: {
              Authorization: `Bearer ${c_tokenData}`,
            },
          });

          if (req.data.admin === "false") {
            setUserCommonAllowed(true);
          } else {
            setUserCommonAllowed(false);
          }

          setUserId(req.data.id);
        } catch (error) {
          console.error("Token inválido, removendo do localStorage.", error);
          localStorage.removeItem("c__token");
          setUserAllowed(false);
          navigate("/");
        }
      }
    }

    callEndpointToVerifyJwt();
    callEndpointToVerifyJwtToCommonUser();
  }, []);

  const PrivateRoutes = () => {
    return (
      <>
        <Routes>
          <Route path="/admin" element={<Dashboard />} />
        </Routes>
      </>
    );
  };

  const PublicRoutes = () => {
    return (
      <>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/product/:category/:code/:id"
            element={<ProductDescription />}
          />
          <Route path="/:category" element={<ProductByCategory />} />
          <Route path="/purchase/:id" element={<Purchase />} />
          <Route
            path="/founded"
            element={<ProductsFiltred></ProductsFiltred>}
          />
          <Route
            path="/product/:category/:code/payment/:id"
            element={<Purchase />}
          />
          <Route
            path="/settings"
            element={userCommonAllowed ? <UserSettings />: <h1>404</h1> }
          />
        </Routes>
      </>
    );
  };

  return (
    <Routes>
      <Route
        path="/*"
        element={userAllowed ? <PrivateRoutes /> : <PublicRoutes />}
      />
    </Routes>
  );
}

export default App;
