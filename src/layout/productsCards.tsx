import { useProducts } from "../products/components";
import ProductCard from "./productCard";

function ProductsCards() {
    const { products } = useProducts()
    return (
        <div className="container products">
            <div id="products" className="row">
                {products.map((product, index) => {
                    return <ProductCard key={index} item={product} />
            })}
            </div>
        </div>
    );
}

export default ProductsCards;
