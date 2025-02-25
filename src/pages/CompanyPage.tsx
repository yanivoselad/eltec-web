
import CompaniesNav from '../layout/companiesNav';
import CategoryCards from '../layout/categoryCards';
import { useProducts } from '../products/components';
import _ from 'lodash';
import { useParams } from 'react-router-dom';
import LocationNav from '../layout/locationNav';
import lang from '../language/he/index.js'
import ProductsNav from '../layout/ProductsNav';
import Sales from '../layout/Sales';

interface RouteParams {
    companyName: string
}

function HomePage() {
    const { categories } = useProducts() || []
    const { companyName } = useParams<RouteParams>();
    const cats = _.filter(categories, (category) => category?.companies?.includes(companyName)) || []
    return (
        <div>
            <CompaniesNav />
            <ProductsNav />
            <Sales />
            <LocationNav noBreadcrumbs title={[
                {
                    title: lang.nav.home,
                    link: '/',
                },
                {
                    title: companyName,
                },
                {
                    title: lang.category.titles.all,
                },
            ]} />
            {/*<LocationNav title={[lang.category.titles.all,lang.category.nav.company,companyName]} />*/}
            <div className="page">            
                <CategoryCards categories={cats}/>
            </div>
        </div>
    );
}

export default HomePage;
