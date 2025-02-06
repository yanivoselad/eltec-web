import { useProducts } from "../products/components";
import ProductCard from "./productCard";
import { useParams, Link } from 'react-router-dom';
import { Product } from "../types";
import _ from 'lodash'

interface RouteParams {
    categoryName: string
}

interface Props {
    products: Product[]
}

function ProductsCards(props: Props) {
    const { products  } = props
    return (
        <div className="container products">
            <div id="products" className="row">
                {products.map((product: Product, index) => {
                   return <ProductCard key={index} item={product} />
            })}
            </div>
        </div>
    );
}

export default ProductsCards;
