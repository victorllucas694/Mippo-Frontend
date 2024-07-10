import { createContext, useContext, useState, ReactNode } from 'react';

interface PaymentContext {
  nameBody: string;
  lastNameBody: string;
  addressBody: string;
  detailsBody: string;
  cityBody: string;
  stateBody: string;
  zipBody: string;
  countryBody: string;
  cardholder: String;
  cardNumber: String;
  expirationDate: String;
  cvv: String;
  paymentType: string;
  setPaymentType: (value: string) => void;
  setCardholder: (value: string) => void;
  setCardNumber: (value: string) => void;
  setExpirationDate: (value: string) => void;
  setCvv: (value: string) => void;
  setNameBody: (value: string) => void;
  setLastNameBody: (value: string) => void;
  setAddressBody: (value: string) => void;
  setDetailsBody: (value: string) => void;
  setCityBody: (value: string) => void;
  setStateBody: (value: string) => void;
  setZipBody: (value: string) => void;
  setCountryBody: (value: string) => void;
}


const PaymentContext = createContext<PaymentContext | undefined>(undefined);

export const PaymentContextProvider: React.FC<{ children:ReactNode  }> = ({ children }) => {
  const [nameBody, setNameBody] = useState<string>('');
  const [lastNameBody, setLastNameBody] = useState<string>('');
  const [addressBody, setAddressBody] = useState<string>('');
  const [detailsBody, setDetailsBody] = useState<string>('');
  const [cityBody, setCityBody] = useState<string>('');
  const [stateBody, setStateBody] = useState<string>('');
  const [zipBody, setZipBody] = useState<string>('');
  const [countryBody, setCountryBody] = useState<string>('');

  const [ paymentType, setPaymentType] = useState<string>("creditCard");
  const [ cardholder, setCardholder ] = useState<string>('');
  const [ cardNumber, setCardNumber ] = useState<string>('');
  const [ expirationDate, setExpirationDate ] = useState<string>('');
  const [ cvv, setCvv ] = useState<string>('');

  return (
    <PaymentContext.Provider
      value={{
        nameBody,
        cardNumber,
        setPaymentType,
        paymentType,
        cardholder,
        lastNameBody,
        expirationDate,
        addressBody,
        cvv,
        detailsBody,
        cityBody,
        stateBody,
        zipBody,
        countryBody,
        setNameBody,
        setLastNameBody,
        setAddressBody,
        setDetailsBody,
        setCityBody,
        setStateBody,
        setZipBody,
        setCountryBody,
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
