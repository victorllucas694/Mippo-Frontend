import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
import Payment from "./pages/Payment";
import { MyContextProvider } from "./contexts/PaymentContext";
import PurchaseProducts from "./components/PurchaseProducts/Index";

function App() {
  return (
    <AxiosProvider>
      <MyContextProvider>
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
      </MyContextProvider>
    </AxiosProvider>
  );
}

function AppContent() {
  const { axiosInstance } = useAxios();
  const { setUserId } = useAuth();
  const [userAllowed, setUserAllowed] = useState<boolean>(false);

  useEffect(() => {
    async function callEndpointToVerifyJwt() {
      const c_tokenData = localStorage.getItem("c__token");
      if (c_tokenData) {
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
      }
    }

    callEndpointToVerifyJwt();
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
          <Route path="/payment/:id" element={<Payment />} />
          <Route path="/purchase/:id" element={<PurchaseProducts />} />
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
