import { createContext, useContext, ReactNode } from 'react'
import { useLocalStorage } from './useLocalStorage';
import itemsStatic from './items.json';


export type InvoiceT = {
    name: string;
    description: string;
    date: string;
    qty: number;
    price: number;
    amount: number;
    id: string;
    status: string;
};


export type InvoiceProviderProps = {
    children: ReactNode
}

export type InvoiceContext = {
    items : InvoiceT[],
    addInvoice: (invoice: InvoiceT) => void;
}


const InvoiceContext = createContext({} as InvoiceContext)

export function useInvoice() {
    return useContext(InvoiceContext)
}

export function InvoiceProvider({ children }: InvoiceProviderProps) {
    const [items, setItems] = useLocalStorage<InvoiceT[]>('callAnything', itemsStatic);

    const addInvoice = (invoice: InvoiceT) => {
        const updatedItems = [...items, invoice];
        setItems(updatedItems);
    }


    return (
        <InvoiceContext.Provider
            value={{
                items,
                addInvoice
            }}>
            {children}
        </InvoiceContext.Provider>
    )
}