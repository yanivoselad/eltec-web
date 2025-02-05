import { Product, promiseProduct } from "types"

export const getProducts = async (): Promise<promiseProduct> => {
    try {
        //dispatch(loadProductsInProgress());
        const response = await fetch('http://localhost:4000/api/products');

        const data = await response.json();
        return data;
        //dispatch(loadProductsSuccess(products));
        //dispatch(setLoadedData(true));
    } catch (e) {
        /* cant load from server*/
        console.log('error',e)
        return {
            products: [],
            companies:[],
        };
    }
}