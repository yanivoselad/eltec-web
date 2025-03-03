export interface Product {
    _id: string,
    category?: string,
    subcategory?: string,
    company: string,
    code?: string,
    subcode?: string,
    description?: string,
    amount: number,
    formatedtitle?: string,
    izo?: string,
    grade?: string,
    uuid:number
}

export interface CreateProduct {
    type: "create",
    payload: Omit<Product, "id" | "product_create_time">
}


export interface UpdateProduct{
    type: "update",
    payload: Product
}

export interface RemoveProduct{
    type: "remove",
    payload: string
}

export interface SelectCategory {
    type: "selectCategory",
    payload: string
}

export interface SelectCompany {
    type: "selectCompany",
    payload: string
}


/*
export const setSearchProducts{
    type: SET_SEARCH_PRODUCTS,
    payload: terms,
})

export const LOAD_PRODUCTS_IN_PROGRESS = 'LOAD_PRODUCTS_IN_PROGRESS';
export const loadProductsInProgress = () => ({
    type: LOAD_PRODUCTS_IN_PROGRESS,
})



export const LOAD_PRODUCTS_FAILURE = 'LOAD_PRODUCTS_FAILURE';
export const loadProductsFailure = () => ({
    type: LOAD_PRODUCTS_FAILURE,
})*/


/*export interface SetLoadedData{
    type: "set_loaded_data",
    payload: state,
}*/
export type promiseProduct = {
    products: Product[]
    companies: string[]
    categories: Record<string, any>[]
    lang: Record<string, any>
}

export const promiseProductInitial: promiseProduct = {
    products: [],
    companies: [],
    categories: [],
    lang: {},
}

export type productsFilter = {
    company: string | null
    category: string | null
}

export interface LoadProductsSuccess {
    type: "load_success",
    payload: promiseProduct
}


export type ProductsAction =
    | CreateProduct
    | UpdateProduct
    | RemoveProduct
    | LoadProductsSuccess
    | SelectCategory
    | SelectCompany