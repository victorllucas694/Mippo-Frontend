import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PaymentContext {
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  cardholder: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
  setAddress1: (value: string) => void;
  setAddress2: (value: string) => void;
  setCity: (value: string) => void;
  setState: (value: string) => void;
  setZip: (value: string) => void;
  setCountry: (value: string) => void;
  setCardholder: (value: string) => void;
  setCardNumber: (value: string) => void;
  setExpirationDate: (value: string) => void;
  setCvv: (value: string) => void;
}


const PaymentContext = createContext<PaymentContext | undefined>(undefined);

export const PaymentContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [address1, setAddress1] = useState<string>('');
  const [address2, setAddress2] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [zip, setZip] = useState<string>('');
  const [country, setCountry] = useState<string>('');

  const [ cardholder, setCardholder ] = useState<string>('');
  const [ cardNumber, setCardNumber ] = useState<string>('');
  const [ expirationDate, setExpirationDate ] = useState<string>('');
  const [ cvv, setCvv ] = useState<string>('');


  return (
    <PaymentContext.Provider
      value={{
        firstName,
        lastName,
        address1,
        address2,
        city,
        cardholder,
        cardNumber,
        expirationDate,
        cvv,
        state,
        zip,
        country,
        setFirstName,
        setLastName,
        setAddress1,
        setAddress2,
        setCity,
        setState,
        setZip,
        setCountry,
        setCardholder,
        setCardNumber,
        setExpirationDate,
        setCvv 
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
