import { createContext, useContext, useState, ReactNode } from "react";

interface IPageContextData {
  pageName: string;
  setPageName: (page: string) => void;
}

const PagesManagementContext = createContext<IPageContextData | undefined>(
  undefined
);

export function PagesManagementProvider({ children }: { children: ReactNode }) {
  const [pageName, setPageName] = useState<string>("Main");

  return (
    <PagesManagementContext.Provider
      value={{
        pageName,
        setPageName,
      }}
    >
      {children}
    </PagesManagementContext.Provider>
  );
}

export function usePagesManagement(): IPageContextData {
  const context = useContext(PagesManagementContext);
  if (context === undefined) {
    throw new Error(
      "PagesManagementContext deve ser usado dentro de um AuthProvider"
    );
  }
  return context;
}
