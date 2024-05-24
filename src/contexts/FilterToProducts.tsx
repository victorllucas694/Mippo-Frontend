import React, { createContext, useContext, useState, ReactNode } from 'react';

interface IFilter {
    category: string;
    setCategory: (value: string) => void
}


const IFilterContext = createContext<IFilter | undefined>(undefined);

export const FilterContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [category, setCategory] = useState<string>('');


    return (
        <IFilterContext.Provider
            value={{
                category,
                setCategory
            }}
        >
            {children}
        </IFilterContext.Provider>
    );
};

export const useFilterContext = () => {
    const context = useContext(IFilterContext);

    if (!context) {
        throw new Error('useMyContext must be used within a MyContextProvider');
    }
    
    return context;
};
