import React, { createContext, useContext, useState, ReactNode } from 'react';

type AddressData = {
  name: string;
  last_name: string;
  address: string;
  address_other: string;
  city: string;
  state: string;
  CEP: string;
  country: string;
};

type PaymentData = {
  nameUserCard: string;
  cardNumber: string;
  ExpireDate: string;
  CVV: string;
};

type MyContextData = {
  shippingAddress: AddressData;
  setShippingAddressData: (newShippingAddress: AddressData) => void;
  paymentData: PaymentData;
  setPaymentData: (newPaymentData: PaymentData) => void;
  saveAddressToContext: (field: string, value: string) => void;
};

const PaymentContext = createContext<MyContextData | undefined>(undefined);

type PaymentContextProviderProps = {
  children: ReactNode;
};

function MyContextProvider({ children }: PaymentContextProviderProps) {
  const [shippingAddress, setShippingAddress] = useState<AddressData>({
    name: '',
    last_name: '',
    address: '',
    address_other: '',
    city: '',
    state: '',
    CEP: '',
    country: '',
  });

  const [paymentData, setPaymentData] = useState<PaymentData>({
    nameUserCard: '',
    cardNumber: '',
    ExpireDate: '',
    CVV: '',
  });


  const setShippingAddressData = (newShippingAddress: AddressData) => {
    setShippingAddress(newShippingAddress);
  };

  const setPaymentDataFunc = (newPaymentData: PaymentData) => {
    setPaymentData(newPaymentData);
  };

  const saveAddressToContext = (field: string, value: string) => {
    setShippingAddressData({
      ...shippingAddress,
      [field]: value,
    });
  };

  return (
    <PaymentContext.Provider
      value={{
        shippingAddress,
        setShippingAddressData,
        paymentData,
        setPaymentData: setPaymentDataFunc,
        saveAddressToContext,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
}

function useMyContext(): MyContextData {
  const context = useContext(PaymentContext);

  if (!context) {
    throw new Error('useMyContext deve ser usado dentro de um MyContextProvider');
  }

  return context;
}

export { MyContextProvider, useMyContext };
