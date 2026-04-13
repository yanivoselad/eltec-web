
import CompaniesNav from '../layout/companiesNav';
import CategoryCards from '../layout/categoryCards';
import { useProducts } from '../products/components';
import _ from 'lodash';
import { useParams } from 'react-router-dom';
import LocationNav from '../layout/locationNav';

import ProductsNav from '../layout/ProductsNav';
import Sales from '../layout/Sales';

interface RouteParams {
    companyName: string
}

function HomePage() {
    const { categories, products, lang } = useProducts() || []
    const { companyName } = useParams<RouteParams>();

    // Filter categories that have products for this company
    const cats = _.filter(categories, (category) => {
        return _.some(products, (product) =>
            product.company === companyName && product.category === category.name
        );
    }) || [];
    return (
        <div>
            <CompaniesNav />
            <ProductsNav />
            <Sales />
            <LocationNav noBreadcrumbs title={[
                {
                    title: _.get(lang, 'nav.home', ''),
                    link: '/',
                },
                {
                    title: companyName,
                },
                {
                    title: _.get(lang, 'category.titles.all', ''),
                },
            ]} />
            {/*<LocationNav title={[_.get(lang,'category.titles.all,_.get(lang,'category.nav.company,companyName]} />*/}
            <div className="page">            
                <CategoryCards categories={cats}/>
            </div>
        </div>
    );
}

export default HomePage;
