import React, { useState, createContext, useContext, ReactNode } from "react";

interface IRegisterInputForm {
  [key: string]: string;
}

interface ILoginInputForm {
  [key: string]: string;
}


interface InputContextType {
  registerInput: IRegisterInputForm;
  setRegisterInput: React.Dispatch<React.SetStateAction<IRegisterInputForm>>;
  loginInput: ILoginInputForm;
  setLoginInput: React.Dispatch<React.SetStateAction<IRegisterInputForm>>;
}

const InputContext = createContext<InputContextType | undefined>(undefined);

export function useInputContext() {
  const context = useContext(InputContext);
  if (context === undefined) {
    throw new Error(
      "useInputContext deve ser usado dentro de um InputProvider"
    );
  }
  return context;
}

export const InputProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [registerInput, setRegisterInput] = useState<IRegisterInputForm>({});
  const [loginInput, setLoginInput] = useState<IRegisterInputForm>({});
  
  return (
    <InputContext.Provider
      value={{ registerInput, setRegisterInput, loginInput, setLoginInput }}
    >
      {children}
    </InputContext.Provider>
  );
};
