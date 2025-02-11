
import CompaniesNav from '../layout/companiesNav';
import LocationNav from '../layout/locationNav';
import lang from '../language/he/index.js'
import { useParams, Link } from 'react-router-dom';
import _ from 'lodash';
import { useProducts } from '../products/components';
import { Product } from '../types';
import ProductCard from '../layout/productCard';
import ProductsNav from '../layout/ProductsNav';

interface RouteParams {
    categoryName: string
    companyName: string
    productId: string

}
function HomePage() {
    const { companyName, categoryName, productId } = useParams<RouteParams>();
    const { products } = useProducts()
    console.log(productId)
    const item = _.find(products, { uuid: Number(productId) }) as Product | undefined
    return (
        <div className="page">
            <CompaniesNav />
            <ProductsNav />
            <LocationNav noBreadcrumbs title={[
                {
                    title: lang.nav.home,
                    link: '/',
                },
                {
                    title: companyName ? companyName : lang.category.nav.categories,
                    link: companyName ? '/company/' + companyName : '/',
                },
                {
                    title: _.get(lang.category.titles, categoryName, categoryName),
                    link: companyName ? '/company/' + companyName + '/' + categoryName : '/category/' + categoryName,
                },
                {
                    title: item?.subcode || item?.code || '',
                },
            ]} />
            {item ? <ProductCard item={item} /> : <div style={{ textAlign: 'center' }}>not found</div>}
        </div>
    );
}

export default HomePage;
