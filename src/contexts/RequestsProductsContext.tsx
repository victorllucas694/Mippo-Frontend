import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";
import axiosInstance from "../providers/AxiosInstance";

interface Subcategory {
  name: string;
  valor: string[];
}

interface Category {
  name: string;
  subcategories: Subcategory[];
}

interface Product {
  Fabricante: string;
  Marca: string;
  Descricao_final_sobre_o_produto: string;
  Codigo: string;
  Codigo_das_Imagens: string;
  Quantidade_em_estoque: number;
  Valor_a_prazo: string;
  Valor_a_vista: string;
  id: number;
}

interface RequestsProductsContextType {
  productSelected: any;
  setterProductSelected: (product: Product) => void;
  addItemToShoppingCart: () => void;
  shoppingCart: number;
  alertlogin: string;
  calcPriceByShoppingCart: (price: string) => void;
  totalPrice: number;
  globalCategory: string | null;
  computerCategory: Category[];
  isUserLoggedIn: () => Promise<void>;
  verifyUserLoggedByAddProductToShoppingCart: (
    id: number,
    productsList: Product
  ) => Promise<void>;
  setterGlobalProductCategoryByNavbar: (category: string) => void;
  getProductImageByCategoryAndProductId: (
    category: string,
    productID: string,
    imageCode: string
  ) => Promise<void>;
  accessoriesCategory: Category[];
  created: boolean;
  searchInput: string;
  HardwareDataCategory: Category[];
  NotebookDataCategory: Category[];
  filterArrayByProductInput: (search: string) => void;
}

const RequestsProductsContext = createContext<RequestsProductsContextType | undefined>(undefined);

interface RequestsProductsProviderProps {
  children: ReactNode;
}

export function RequestsProductsProvider({ children }: RequestsProductsProviderProps) {
  const [productSelected, setProductSelected] = useState<Product | null>(null);
  const [shoppingCart, setShoppingCart] = useState<number>(1);
  const [globalCategory, setGlobalCategory] = useState<string | null>(null);
  const [_countdown, setCountdown] = useState<number | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const accessoriesDataCategory: Category[] = [
    {
      name: "Informações Gerais",
      subcategories: [
        {
          name: "Fornecedores",
          valor: ["FutureTech", "InnoTech", "MegaForce"],
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

  const NotebookDataCategory: Category[] = [
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
          valor: ["Nvidia", "AMD", "Placa de vídeo integrada"],
        },
      ],
    }
  ];

  const HardwareDataCategory: Category[] = [
    {
      name: "Informações Gerais",
      subcategories: [
        {
          name: "Fabricante",
          valor: ["FutureTech", "InnoTech", "MegaForce", "MSI", "Zotac", "Sapphire", "Gigabyte"],
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
            "Placa de Vídeo",
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

  const computersDataCategory: Category[] = [
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
  const [computerCategory, __setComputerCategory] = useState<Category[]>(
    computersDataCategory
  );

  const [accessoriesCategory, __setAccessoriesCategory] = useState<Category[]>(
    accessoriesDataCategory
  );

  const setterGlobalProductCategoryByNavbar = (category: string) => {
    window.location.href = `/${category}`;
    setGlobalCategory(category);
  };

  const [created, setCreated] = useState<boolean>(false);
  const [alertlogin, setAlertLogin] = useState<string>("");

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
    price: string,
    currentTotal: number
  ): number => {
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

  const [searchInput, setSearchInput] = useState<string>("");

  const filterArrayByProductInput = (search: string) => {
    setSearchInput(search);
  };

  const calcPriceByShoppingCart = async (priceToConvert: string) => {
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
    category: string,
    productID: string,
    imageCode: string
  ) => {
    const foundedImages = await axiosInstance(
      `/products-management-without-auth/get/all/images/${category}/${productID}/${imageCode}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    foundedImages.data.map((data: any) => {
      console.log("data", data);
    });
  };

  const verifyUserLoggedByAddProductToShoppingCart = async (
    id: number,
    productsList: Product
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
    console.log(response)
  };

  const setterProductSelected = (product: Product) => {
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
