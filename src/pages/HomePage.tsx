
import CompaniesNav from '../layout/companiesNav';
import CategoryCards from '../layout/categoryCards';
import { useProducts } from '../products/components';
import lang from '../language/he/index.js'
import ProductsNav from '../layout/ProductsNav';

function HomePage() {
    const { categories } = useProducts()
    return (
        <div>
            <CompaniesNav />
            <ProductsNav />
            <div className="page">
                <div className="container">
                    <div className="section-title">
                        {lang.category.nav.our_products}
                    </div>
                </div>
                <CategoryCards categories={categories}/>
            </div>
        </div>
    );
}

export default HomePage;
