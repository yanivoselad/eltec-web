import { Product, promiseProduct } from "types"

export const getProducts = async (): Promise<promiseProduct> => {
    try {
        //dispatch(loadProductsInProgress());
        //yaniv
        const response = await fetch('https://77g5o5zvcx22ry5277rfs2xqhm0ecwbe.lambda-url.eu-north-1.on.aws/');

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