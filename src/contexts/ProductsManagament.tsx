import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import axiosInstance from "../providers/AxiosInstance";

interface Column {
    id:
      | "Nome_do_pacote"
      | "Codigo_do_pacote"
      | "Categoria_do_Pacote"
      | "Modelo_do_pacote"
      | "Distribuidor"
      | "Estado_do_Produto"
      | "Editar"
      | "Deletar";
    label: string;
    minWidth?: number;
    align?: "right";
    format?: (value: number) => string;
    render?: (value: number, row: any) => JSX.Element;
  }
  
  interface IPackageData {
    Nome_do_pacote: string;
    Codigo_do_pacote: string;
    Categoria_do_Pacote: string;
    Modelo_do_pacote: string;
    Distribuidor: string;
    Estado_do_Produto: string;
  }
  
  interface IPackageDataType {
    User_Id: number;
    drop_brand: string;
    drop_categories: string;
    drop_code: string;
    drop_description: string;
    drop_products_state: string;
    drop_seller: string;
    id: number;
    min_price: string;
    model_product: string;
    product_name: string;
  }
  let rows: any = [];

interface IProductsManagement {

}


const ProductsManagementContext = createContext<IProductsManagement | undefined>(undefined);

export function ProductsManagementProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string>(
    localStorage.getItem("c__token") || ""
  );

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const [renderDataPackages, setRenderDataPackages] = React.useState<
    IPackageDataType[] | null
  >(null);



  return (
    <ProductsManagementContext.Provider
      value={{
        token,

      }}
    >
      {children}
    </ProductsManagementContext.Provider>
  );
}

export function useAuth(): IProductsManagement {
  const context = useContext(ProductsManagementContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
