import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import axiosInstance from "../providers/AxiosInstance";

let rows = [];

export const RequestsProductsContext = createContext(undefined);

export function RequestsProductsProvider({ children }) {
  const [productSelected, setProductSelected] = useState(null);
  const [shoppingCart, setShoppingCart] = useState(1);
  const [globalCategory, setGlobalCategory] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [priceShoppingCart, setPriceShoppingCart] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  const accessoriesDataCategory = [
    {
      name: "Informações Gerais",
      subcategories: [
        {
          name: "Fabricante",
          valor: ["FutureTech", "InnoTech", "MegaForce", "MegaForce"],
        },
        {
          name: "Marca",
          valor: [
            "Logitech MX Master 3",
            "Bose QuietComfort 35 II",
            "Belkin Thunderbolt 3 Dock",
            "Samsung EVO 970",
          ],
        },
      ],
    },
    {
      name: "Acessórios",
      subcategories: [
        {
          name: "Montagem necessária",
          valor: ["Sim", "Não"],
        },
        {
          name: "Carregamento",
          valor: ["Pilha", "Bateria"],
        },
      ],
    },
  ];

  const NotebookDataCategory = [
    {
      name: "Componentes",
      subcategories: [
        {
          name: "Processador",
          valor: ["AMD", "Intel"],
        },
        {
          name: "Memória RAM",
          valor: ["DDR3", "DDR4", "DDR5"],
        },
        {
          name: "Conexões",
          valor: ["Wi-Fi", "Bluetooth"],
        },
        {
          name: "Sistema Operacional",
          valor: ["Windows", "Linux"],
        },
        {
          name: "Placas de vídeo",
          valor: ["Nvidia", "AMD"],
        },
      ],
    },
    {
      name: "Notebook",
      subcategories: [
        {
          name: "Tipo de conexão",
          valor: ["WI-FI", "Bluetooth"],
        },
      ],
    },
  ];

  const HardwareDataCategory = [
    {
      name: "Informações Gerais",
      subcategories: [
        {
          name: "Fabricante",
          valor: ["FutureTech", "InnoTech", "MegaForce"],
        },
        {
          name: "Marca",
          valor: ["AMD", "NVIDIA"],
        },
      ],
    },
    {
      name: "Hardware",
      subcategories: [
        {
          name: "Tipo do hardware",
          valor: [
            "Processador",
            "Placa de video",
            "Armazenamento",
            "Monitores",
            "Impressoras",
          ],
        },
        {
          name: "Consumo de energia",
          valor: ["120W", "240W"],
        },
      ],
    },
  ];

  const computersDataCategory = [
    {
      name: "Computadores",
      subcategories: [
        {
          name: "Processador",
          valor: ["AMD", "Intel"],
        },
        {
          name: "Memória RAM",
          valor: ["DDR3", "DDR4", "DDR5"],
        },
        {
          name: "Tipo de conexão",
          valor: ["Wi-Fi", "Bluetooth"],
        },
        {
          name: "Sistema operacional",
          valor: ["Windows", "Linux"],
        },
        {
          name: "Placa de video",
          valor: ["Nvidia", "AMD"],
        },
      ],
    },
  ];
  const token = localStorage.getItem("c__token");
  const [computerCategory, setComputerCategory] = useState(
    computersDataCategory
  );

  const [accessoriesCategory, setAccessoriesCategory] = useState(
    accessoriesDataCategory
  );

  const setterGlobalProductCategoryByNavbar = (category) => {
    window.location.href = `/${category}`;
    setGlobalCategory(category);
  };

  const [created, setCreated] = useState(false);
  const [alertlogin, setAlertLogin] = useState("");

  const isUserLoggedIn = async () => {


    if (token) {
      try {
        const response = await axiosInstance.get("/authenticate/token-verify", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setCreated(true);
        } else {
          setAlertLogin("precisa logar");
          console.log(alertlogin);
        }
      } catch (error) {
        setAlertLogin("precisa logar");
        console.log(alertlogin);
      }
    } else {
      setAlertLogin("precisa logar");
      console.log(alertlogin);
    }
  };

  const removeCurrencySymbolAndAddToTotal = (
    price,
    currentTotal
  ) => {
    if (price) {
      const priceWithoutCurrency = price.replace("R$", "").trim();
      const priceValue = parseFloat(priceWithoutCurrency);

      if (!isNaN(priceValue)) {
        const newTotal = currentTotal + priceValue;
        return newTotal;
      }
    }

    return currentTotal;
  };

  const [searchInput, setSearchInput] = useState("");

  const filterArrayByProductInput = (search) => {
    setSearchInput(search);
  };

  const calcPriceByShoppingCart = async (priceToConvert) => {
    const newTotalPrice = removeCurrencySymbolAndAddToTotal(
      priceToConvert,
      totalPrice
    );
    setTotalPrice(newTotalPrice);
  };

  const addItemToShoppingCart = async () => {
    setCountdown(5);

    const interval = setInterval(() => {
      setCountdown((prevCount) => (prevCount !== null ? prevCount - 1 : null));
    }, 1000);

    clearInterval(interval);
    setCountdown(null);

    setShoppingCart((prevCart) => prevCart + 1);
  };

  const getProductImageByCategoryAndProductId = async (
    category,
    productID,
    imageCode
  ) => {

    const foundedImages = await axiosInstance(
      `/products-management-without-auth/get/all/images/${category}/${productID}/${imageCode}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    foundedImages.data.map((data) => {
      console.log("data", data);
    });
  };

  const verifyUserLoggedByAddProductToShoppingCart = async (
    id,
    productsList
  ) => {

    const currentURL = window.location.pathname;
    const urlParts = currentURL.split("/");
    const category = urlParts[1];

    const response = await axiosInstance.post(
      `/order-management/add/new/order/${id}/${category}`,
      productsList,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  const setterProductSelected = (product) => {
    setProductSelected(product);
  };

  return (
    <RequestsProductsContext.Provider
      value={{
        productSelected,
        setterProductSelected,
        addItemToShoppingCart,
        shoppingCart,
        alertlogin,
        calcPriceByShoppingCart,
        totalPrice,
        globalCategory,
        computerCategory,
        isUserLoggedIn,
        verifyUserLoggedByAddProductToShoppingCart,
        setterGlobalProductCategoryByNavbar,
        getProductImageByCategoryAndProductId,
        accessoriesCategory,
        created,
        searchInput,
        HardwareDataCategory,
        NotebookDataCategory,
        filterArrayByProductInput,
      }}
    >
      {children}
    </RequestsProductsContext.Provider>
  );
}

export function useRequestsProductsContext() {
  const context = useContext(RequestsProductsContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}