
import CompaniesNav from '../layout/companiesNav';
import CategoryCards from '../layout/categoryCards';
import { useProducts } from '../products/components';

import ProductsNav from '../layout/ProductsNav';
import Sales from '../layout/Sales';
import CompaniesCards from '../layout/companiesCards';
import _ from 'lodash';

function HomePage() {
    const { categories, companies, lang } = useProducts()
    return (
        <div>
            <CompaniesNav />
            <ProductsNav />
            <Sales />
            <div className="page">
                <div className="container">
                    <div className="section-title">
                        {_.get(lang, 'category.nav.our_products','')}
                    </div>
                </div>
                <CategoryCards categories={categories} />
                <div className="section-title pt-3">
                    {_.get(lang, 'nav.companies','')}
                </div>
                <CompaniesCards companies={companies} />
            </div>
        </div>
    );
}

export default HomePage;
