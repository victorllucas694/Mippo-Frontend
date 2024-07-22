import { createContext, useContext, useState, ReactNode } from "react";
import { IMockProducts } from "../Types";

interface IPageContextData {
  pageName: string;
  PageData: any[];
  setPageName: (page: string) => void;
  setPageData: (e: any[]) => void
}

const PagesManagementContext = createContext<IPageContextData | undefined>(
  undefined
);

export function PagesManagementProvider({ children }: { children: ReactNode }) {
  const [pageName, setPageName] = useState<string>("Main");
  const [PageData, setPageData] = useState<IMockProducts[]>([]);

  console.log(PageData)

  return (
    <PagesManagementContext.Provider
      value={{
        pageName,
        PageData,
        setPageData,
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
