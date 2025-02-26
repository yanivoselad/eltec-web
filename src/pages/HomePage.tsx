
import CompaniesNav from '../layout/companiesNav';
import CategoryCards from '../layout/categoryCards';
import { useProducts } from '../products/components';
import lang from '../language/he/index.js'
import ProductsNav from '../layout/ProductsNav';
import Sales from '../layout/Sales';
import LocationNav from '../layout/locationNav';
import CompaniesCards from '../layout/companiesCards';

function HomePage() {
    const { categories, companies } = useProducts()
    return (
        <div>
            <CompaniesNav />
            <ProductsNav />
            <Sales />
            <div className="page">
                <div className="container">
                    <div className="section-title">
                        {lang.category.nav.our_products}
                    </div>
                </div>
                <CategoryCards categories={categories} />
                <div className="section-title pt-3">
                    {lang.nav.companies}
                </div>
                <CompaniesCards companies={companies} />
            </div>
        </div>
    );
}

export default HomePage;
