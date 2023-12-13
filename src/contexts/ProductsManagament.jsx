import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import axiosInstance from "../providers/AxiosInstance";

let rows = [];

const ProductsManagementContext = createContext(undefined);

export function ProductsManagementProvider({ children }) {
  const [token, setToken] = useState(
    localStorage.getItem("c__token") || ""
  );

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const [renderDataPackages, setRenderDataPackages] = React.useState(
    null
  );

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

export function useAuth() {
  const context = useContext(ProductsManagementContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
