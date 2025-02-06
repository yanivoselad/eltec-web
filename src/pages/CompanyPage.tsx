
import CompaniesNav from '../layout/companiesNav';
import CategoryCards from '../layout/categoryCards';
import ProductsCards from '../layout/productsCards';
import { useProducts } from '../products/components';
import _ from 'lodash';
import { useParams, Link } from 'react-router-dom';
import LocationNav from '../layout/locationNav';
import lang from '../language/he/index.js'

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
            <LocationNav title={`${lang.category.titles.all} ~ ${lang.category.nav.company} ${companyName}`} />
            <div className="page">            
                <CategoryCards categories={cats}/>
            </div>
        </div>
    );
}

export default HomePage;
