
import ProductsCards from '../layout/productsCards';
import { useProducts } from "../products/components";
import { useParams } from 'react-router-dom';
import _ from 'lodash'
import CompaniesNav from '../layout/companiesNav';
import LocationNav from '../layout/locationNav';
import ProductsNav from '../layout/ProductsNav';

interface RouteParams {
    term: string
}

function ResultsPage() {
    const { products, lang } = useProducts()
    const { term } = useParams<RouteParams>();

    const prds = _.filter(products, (product) => {
        const find = _.toLower(product?.subcode || product?.code)
        return find.includes(_.toLower(term))
    })

    
    return (
        <div className="">
            <CompaniesNav />
            <ProductsNav />
            <LocationNav noBreadcrumbs title={[
                {
                    title: _.get(lang, 'nav.home',''),
                    link: '/',
                },
                {
                    title: _.get(lang, 'nav.results',''),
                },
            ]} />
            
            <div className="page container">
                <div className="d-flex rtl">
                    <div style={{ textAlign: 'right' }}>{_.get(lang, 'nav.found')} {prds.length} {_.get(lang, 'nav.totalresutls')} </div>
                    <div>&nbsp;"{term}" </div>
                </div>
                <ProductsCards products={prds} />
            </div>
        </div>
    );
}

export default ResultsPage;
