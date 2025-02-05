import React, { useReducer, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

import { Product, ProductsAction, productsFilter } from 'types';
import { getProducts } from 'api/products';



interface ProductsState {
    products: Product[]
    companies: string[]
    initialized: boolean
    filter: productsFilter
}

export function useProductCollection(): [ProductsState, React.Dispatch<ProductsAction>] {
    // TODO: Implement all action processing

    const productReducer = (state: ProductsState, action: ProductsAction): ProductsState => {
        switch (action.type) {
            case 'load_success':
                return {
                    ...state,
                    products: action.payload.products,
                    companies: action.payload.companies,
                    initialized: true
                };

            case 'create':
                return { ...state };

            case 'remove':
                return { ...state };

            case 'update':
                return { ...state };
            case 'update':
                return { ...state };
            case 'selectCategory':
                return {
                    ...state,
                    filter: {
                        ...state.filter,
                        category: action.payload
                    }
                };
            case 'selectCompany':
                return {
                    ...state,
                    filter: {
                        ...state.filter,
                        company: action.payload
                    }
                };
            default:
                return state
        }
    };

    const [state, dispatch] = useReducer(productReducer, {
        products: [],
        companies: [],
        initialized: false,
        filter: {
            company: null,
            category: null,
        },
    });

    useEffect(() => {
        // TODO: Call fetch action
        let products = getProducts();
        products.then((data) => {
            console.log(data)
            if (typeof data !== undefined)
                dispatch({ type: 'load_success', payload: data })
        })
    }, []);

    return [state, dispatch];
}
