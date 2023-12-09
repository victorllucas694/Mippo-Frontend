import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import axiosInstance from "../providers/AxiosInstance";
import { IMockProducts } from "../Types";

export interface IProductSelected {
  id: number;
  Marca: string;
  Fabricante: string;
  Formato: string;
  Marca_do_processador: string;
  Tipo_de_processador: string;
  Velocidade_do_processador: string;
  Tipo_de_soquete_do_processador: string;
  Numero_de_processadores: string;
  Tamanho_da_memoria: string;
  Tecnologia_da_memoria: string;
  Tipo_de_Memoria: string;
  Tamanho_do_HD: string;
  Tecnologia_do_HD: string;
  Interface_do_HD: string;
  Marca_do_chipset_de_video: string;
  Descricao_da_placa_de_video: string;
  Tipo_de_conexao: string;
  Tecnologia_de_conexao: string;
  Plataforma_de_hardware: string;
  Sistema_operacional: string;
  Peso_do_produto: string;
  Dimensoes_da_embalagem: string;
  Codigo: string;
  Fornecedor: string;
  Quantidade_em_estoque: string;
  User_Id: number;
  Valor_a_vista: string;
  Valor_a_prazo: string;
  Codigo_das_Imagens: string;
  Dimensoes_do_pacote: string;
  Descricao_final_sobre_o_produto: string;
  Tamanho_da_tela: string;
  Bateria_interna: string;
  Teclado_e_touchpad: string;
  Conectividade_sem_fio: string;
  Tela_sensivel_ao_toque: string;
  Webcam_embutida: string;
  Audio_integrado: string;
  Leitor_de_cartoes_de_memoria: string;
  montagem_necessaria: string;
  bateria_pilha: string;
  bateria_inclusa: string;
  tipo_da_bateria: string;
  Conectividade: string;
  Tamanho_Fisico: string;
  Consumo_de_Energia: string;
  Compatibilidade: string;
  Interfaces: string;
  Drivers: string;
  Outras_Caracteristicas: string;
  Tipo_de_Hardware: string;
  Arquitetura: string;
  Velocidade_do_Clock: string;
  Nucleos_e_Threads: string;
  Capacidade_de_Armazenamento: string;
  Tamanho_da_Memoria_RAM: string;
}

interface RequestsProductsContextType {
  productSelected: IProductSelected | null;
  setterProductSelected: (product: IProductSelected) => void;
  addItemToShoppingCart: () => void;
  shoppingCart: number | null;
  calcPriceByShoppingCart: (priceToConvert: string) => void;
  totalPrice: number;
  globalCategory: string | null;
  isUserLoggedIn: () => void;
  verifyUserLoggedByAddProductToShoppingCart: (
    id: number,
    productsList: IMockProducts
  ) => void;
  getProductImageByCategoryAndProductId: (
    category: string,
    productID: string,
    imageCode: string
  ) => void;
  filterArrayByProductInput: (search: string) => void;
  setterGlobalProductCategoryByNavbar: (priceToConvert: string) => void;
  computerCategory: Category[];
  HardwareDataCategory: Category[];
  accessoriesCategory: Category[];
  NotebookDataCategory: Category[];
  created: boolean;
  alertlogin: string;
  searchInput: string;
}

export interface Category {
  name: string;
  subcategories: Subcategories[];
}

export interface Subcategories {
  name: string;
  valor: string[];
}

const RequestsProductsContext = createContext<
  RequestsProductsContextType | undefined
>(undefined);

export function RequestsProductsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [productSelected, setProductSelected] =
    useState<IProductSelected | null>(null);
  const [shoppingCart, setShoppingCart] = useState<number>(1);
  const [globalCategory, setGlobalCategory] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [priceShoppingCart, setPriceShoppingCart] = useState<string | null>(
    null
  );
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const acessoriesDataCategory: Category[] = [
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

  const HardwareDataCategory: Category[] = [
    {
      name: "Informações Gerais",
      subcategories: [
        {
          name: "Fabricante",
          valor: ["FutureTech", "InnoTech", "MegaForce", "MegaForce"],
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
            "Moniitores",
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
      name: "Informações Gerais",
      subcategories: [
        {
          name: "Fabricantes",
          valor: ["FutureTech", "InnoTech", "MegaForce", "MegaForce"],
        },
        {
          name: "Formato do produto",
          valor: ["Desktop", "Laptop"],
        },
      ],
    },
    {
      name: "Hardware",
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

  const [computerCategory, setComputerCategory] = useState<Category[]>(
    computersDataCategory
  );

  const [accessoriesCategory, setAccessoriesCategory] = useState<Category[]>(
    acessoriesDataCategory
  );
  const setterGlobalProductCategoryByNavbar = (category: string) => {
    window.location.href = `/${category}`;
    setGlobalCategory(category);
  };
  const [created, setCreated] = useState<boolean>(false);
  const [alertlogin, setAlertLogin] = useState<string>("");

  const isUserLoggedIn = async () => {
    const token = localStorage.getItem("c__token");

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
          console.log(alertlogin)
        }
      } catch (error) {
        setAlertLogin("precisa logar");
        console.log(alertlogin)
      }
    } else {
      setAlertLogin("precisa logar");
      console.log(alertlogin)
    }
  };

  const removeCurrencySymbolAndAddToTotal = (
    price: string | null,
    currentTotal: number
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
  const [searchInput, setSearchInput] = useState<string>('');

  const filterArrayByProductInput = (search: string) => {
    setSearchInput(search)
  }

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
  interface IProductData {
    imageCodes: any;
    largeImages: any;
    sideImages: any;
    tableName: any;
  }

  const [productImagesObject, setProductImagesObject] = useState<
    IProductData | null | undefined
  >(null);

  const getProductImageByCategoryAndProductId = async (
    category: string,
    productID: string,
    imageCode: string
  ) => {
    const token = localStorage.getItem("c__token");
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
    productsList: IMockProducts
  ) => {
    const token = localStorage.getItem("c__token");
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

  const setterProductSelected = (product: IProductSelected) => {
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
        filterArrayByProductInput
      }}
    >
      {children}
    </RequestsProductsContext.Provider>
  );
}

export function useRequestsProductsContext(): RequestsProductsContextType {
  const context = useContext(RequestsProductsContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
