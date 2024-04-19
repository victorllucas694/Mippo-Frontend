import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PaymentContext {
  name: string;
  lastName: string;
  address: string;
  details: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  cardholder: String;
  cardNumber: String;
  expirationDate: String;
  cvv: String;
  setCardholder: (value: string) => void;
  setCardNumber: (value: string) => void;
  setExpirationDate: (value: string) => void;
  setCVV: (value: string) => void;
  setName: (value: string) => void;
  setLastName: (value: string) => void;
  setAddress: (value: string) => void;
  setDetails: (value: string) => void;
  setCity: (value: string) => void;
  setState: (value: string) => void;
  setZip: (value: string) => void;
  setCountry: (value: string) => void;
}


const PaymentContext = createContext<PaymentContext | undefined>(undefined);

export const PaymentContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [name, setName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [details, setDetails] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [zip, setZip] = useState<string>('');
  const [country, setCountry] = useState<string>('');

  const [ cardholder, setCardholder ] = useState<string>('');
  const [ cardNumber, setCardNumber ] = useState<string>('');
  const [ expirationDate, setExpirationDate ] = useState<string>('');
  const [ cvv, setCVV ] = useState<string>('');


  return (
    <PaymentContext.Provider
      value={{
        name,
        lastName,
        address,
        details,
        city,
        state,
        zip,
        country,
        setName,
        setLastName,
        setAddress,
        setDetails,
        setCity,
        setState,
        setZip,
        setCountry,
        setCardholder,
        setCardNumber,
        setExpirationDate,
        setCVV
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export const usePaymentContext = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyContextProvider');
  }
  return context;
};
