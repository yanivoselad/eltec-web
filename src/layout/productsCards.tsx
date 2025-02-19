import { useProducts } from "../products/components";
import ProductCardRow from "./productCardRow";
import { useParams, Link } from 'react-router-dom';
import { Product } from "../types";
import _ from 'lodash'

interface RouteParams {
    categoryName: string
}

interface Props {
    products: Product[]
    type?: string
    searchMode?: boolean
}

function ProductsCards(props: Props) {
    const { products, type, searchMode = false  } = props
    return (
        <div className={`container ${type ? type : 'products'}`}>
            <div id="products" className="row">
                {products.map((product: Product, index) => {
                    return <ProductCardRow searchMode={searchMode} type={type} key={index} item={product} />
            })}
            </div>
        </div>
    );
}

export default ProductsCards;
