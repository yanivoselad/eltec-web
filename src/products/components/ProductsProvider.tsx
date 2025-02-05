import { useProductCollection } from 'products/useProducts';
import React, { useContext } from 'react'

import { Product, ProductsAction, productsFilter } from 'types';

type ProductContextType = {
    filter: productsFilter
    products: Product[]
    companies: string[]
    productsDispatch: React.Dispatch<ProductsAction>
}

export const ProductContext = React.createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC = ({ children }) => {
    const [{ initialized, products, companies, filter }, productsDispatch] = useProductCollection();
    return (
        <ProductContext.Provider value={{ products, companies, productsDispatch, filter }}>
            {initialized ? children : <div>loading...</div>}
        </ProductContext.Provider>
    )
}

export const useProducts = () => {
    const productsCtx = useContext(ProductContext);
    if (!productsCtx) {
        throw new Error("Component beyond ProductContext!")
    }
    return productsCtx;
}
