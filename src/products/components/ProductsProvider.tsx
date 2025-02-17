import { useProductCollection } from 'products/useProducts';
import React, { useContext } from 'react'

import { Product, ProductsAction, productsFilter } from 'types';
import lang from '../../language/he';

type ProductContextType = {
    filter: productsFilter
    products: Product[]
    companies: string[]
    categories: Record<string, any>[]
    productsDispatch: React.Dispatch<ProductsAction>
}

export const ProductContext = React.createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC = ({ children }) => {
    const [{ initialized, products, companies, categories, filter }, productsDispatch] = useProductCollection();
    return (
        <ProductContext.Provider value={{ products, companies, categories, productsDispatch, filter }}>
            {initialized ? children :
                <div className='loading'>
                    <div className="loading-icon"><img src="../../images/loading.png"/></div>
                    <div>{lang.nav.loading}...</div>
                </div>}
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
