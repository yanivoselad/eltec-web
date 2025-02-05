import { useProducts } from "../products/components";
import CategoryCard from "./categoryCard";

function CategoryCards(item:any) {
    const prod = useProducts()
    const categories = [
        {
            name:'aaa'
        },
        {
            name: 'bbb'
        },
        {
            name: 'ccc'
        },
    ]
    return (
        <div className="container products">
            <div id="products" className="row">
            {categories.map((category, index) => {
                return <CategoryCard key={index} item={category} />
            })}
            </div>
        </div>
    );
}

export default CategoryCards;
