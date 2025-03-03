import { useProductCollection } from 'products/useProducts';
import React, { useContext } from 'react'

import { Product, ProductsAction, productsFilter } from 'types';
import language from '../../language/he';

type ProductContextType = {
    filter: productsFilter
    products: Product[]
    companies: string[]
    categories: Record<string, any>[]
    productsDispatch: React.Dispatch<ProductsAction>
    lang: Record<string, any>
}

export const ProductContext = React.createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC = ({ children }) => {
    const [{ initialized, products, companies, categories, filter, lang }, productsDispatch] = useProductCollection();
    return (
        <ProductContext.Provider value={{ products, companies, categories, productsDispatch, filter, lang }}>
            {initialized ? children :
                <div className='loading'>
                    <div className="loading-icon"><img src="/images/loading.png"/></div>
                    <div>{language.nav.loading}...</div>
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
