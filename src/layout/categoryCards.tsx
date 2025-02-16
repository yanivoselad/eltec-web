import { useProducts } from "../products/components";
import CategoryCard from "./categoryCard";

interface Props {
    categories: Record<string,any>[]
}

function CategoryCards(props: Props) {
    const { categories } = props
    return (
        <div className="container products">
            <div id="products" className="row g-3 g-sm-5 justify-content-md-center">
            {categories.map((category:any, index:number) => {
                return <CategoryCard key={index} item={category} />
            })}
            </div>
        </div>
    );
}

export default CategoryCards;
