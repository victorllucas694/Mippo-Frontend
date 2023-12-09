import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import {
  IMockProducts,
  IOffersCheckBoxes,
  IRegisterIO,
  ISocialsDataBoxes,
} from "../Types";
import { useAxios } from "../providers/AxiosProvider";

interface ProductsContextData {
  products: IMockProducts[] | undefined;
  socialsDataBox: ISocialsDataBoxes[];
  registerIOModal: IRegisterIO[];
  offersCheckBoxes: IOffersCheckBoxes[];
  packageCode: string | null;
  badgeNumber: number;
  setBadgeNumber: (badgeNumber: number) => void;
  setPackageCode: (packageCode: string) => void;
}

export const ProductsContext = createContext<ProductsContextData | undefined>(
  undefined
);

interface ProductsProviderProps {
  children: ReactNode;
}

export function ProductContextProvider({ children }: ProductsProviderProps) {
  const offersCheckBoxesIO = [
    {
      label: "Quero receber notificações de promoções por e-mail",
    },
    {
      label: "Quero receber notificações de promoções por whatsApp",
    },
  ];

  const socialsDataBoxes: ISocialsDataBoxes[] = [
    {
      icon: "asd",
      label: "Facebook",
    },
    {
      icon: "asd",
      label: "WhatsApp",
    },
    {
      icon: "asdd",
      label: "Pinterest",
    },
    {
      icon: "dasd",
      label: "Outlook",
    },
  ];

  const registerIO: IRegisterIO[] = [
    {
      label: "Nome",
      placeholder: "Primeiro nome",
      inputPrototype: "name",
      type: "text",
    },
    {
      label: "Sobrenome",
      placeholder: "Sobrenome",
      inputPrototype: "lastName",
      type: "text",
    },
    {
      label: "Email",
      placeholder: "exemplo@exemplo.com",
      inputPrototype: "email",
      type: "email",
    },
    {
      label: "Telefone",
      placeholder: "(DDD)91234-5678",
      inputPrototype: "phone",
      type: "text",
    },
    {
      label: "Senha",
      placeholder: "************",
      inputPrototype: "password",
      type: "password",
    },
  ];

  const { axiosInstance } = useAxios();

  useEffect(() => {
    getMoreSellerProducts();
  }, []);

  const [products, setProducts] = useState<IMockProducts[] | undefined>(
    undefined
  );
  const [socialsDataBox, setSocialDataBox] = useState(socialsDataBoxes);
  const [registerIOModal, setRegisterIOModal] =
    useState<IRegisterIO[]>(registerIO);
  const [offersCheckBoxes, setOffersCheckBoxes] = useState(offersCheckBoxesIO);
  const [packageCode, setPackageCode] = useState<string | null>(null);
  const [badgeNumber, setBadgeNumber] = useState<number>(0);

  const getMoreSellerProducts = async () => {
    const currentURL = window.location.pathname;
    const urlParts = currentURL.split("/");
    let category = urlParts[1];


    if (!category) {
      category = "Computadores";
    }

    const token = localStorage.getItem("c__token");
    const procuctsData = await axiosInstance.get(
      `http://localhost:3000/products-management-without-auth/find/more/seller/products/${category}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setProducts(procuctsData.data);
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        socialsDataBox,
        registerIOModal,
        offersCheckBoxes,
        packageCode,
        setPackageCode,
        badgeNumber,
        setBadgeNumber,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProductsContext() {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error(
      "useProductsContext deve ser usado dentro de um ProductsContextProvider"
    );
  }
  return context;
}
