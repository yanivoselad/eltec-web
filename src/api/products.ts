import { Product, promiseProduct } from "types"

export const getProducts = async (): Promise<promiseProduct> => {
    try {
        //dispatch(loadProductsInProgress());
        //yaniv
        const response = await fetch('/api/products');

        const data = await response.json();
        return data;
        //dispatch(loadProductsSuccess(products));
        //dispatch(setLoadedData(true));
    } catch (e) {
        /* cant load from server*/
        console.log('error',e)
        return {
            products: [],
            companies: [],
            categories: [],
        };
    }
}