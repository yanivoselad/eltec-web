
import CompaniesNav from '../layout/companiesNav';
import LocationNav from '../layout/locationNav';
import lang from '../language/he/index.js'
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import { useProducts } from '../products/components';
import { Product } from '../types';
import ProductCard from '../layout/productCard';
import ProductsNav from '../layout/ProductsNav';
import { useMemo } from 'react';
import GoBack from '../layout/GoBack';

interface RouteParams {
    categoryName: string
    companyName: string
    productId: string

}
function HomePage() {
    const { companyName, categoryName, productId } = useParams<RouteParams>();
    const { products } = useProducts()
    const item = _.find(products, { uuid: Number(productId) }) as Product | undefined
    const navItem = useMemo(() => {
        let nav: Record<string, any> = {
            next: undefined,
            back: undefined
        }
        if (item) {
            const productsIzo = _.filter(products, { izo: item.izo, category: item.category })
            if (productsIzo.length > 1) {
                const grp = _.keys(_.groupBy(productsIzo, 'uuid'))
                const itemIndex = _.indexOf(grp, String(item.uuid))
                nav['next'] = itemIndex + 1 <= grp.length ? grp[itemIndex + 1] : undefined
                nav.back = itemIndex > 0 ? grp[itemIndex - 1] : undefined
            }
        }
        return nav
    }, [item])
    const linksubcategory = companyName ?
        '/company/' + companyName + '/' + categoryName + '/sub/' + item?.subcategory :
        '/category/' + categoryName + '/sub/' + item?.subcategory

    return (
            <><CompaniesNav />
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
                    title: _.get(lang.subcategory.titles, item?.subcategory || ''),
                    link: linksubcategory
                },
            ]} />
        <div className="page container">

                <div className="section-title category">
                    {item?.formatedtitle || item?.code || item?.subcode}
                </div>
                {item ? <ProductCard item={item} nav={navItem} /> : <div style={{ textAlign: 'center' }}>not found</div>}
                <GoBack link={linksubcategory}/>
        </div></>
    );
}

export default HomePage;
