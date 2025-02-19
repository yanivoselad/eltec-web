
import ProductsCards from '../layout/productsCards';
import { useProducts } from "../products/components";
import { useParams } from 'react-router-dom';
import _ from 'lodash'
import { useEffect, useMemo, useState } from 'react';
import { Product } from '../types';
import CompaniesNav from '../layout/companiesNav';
import LocationNav from '../layout/locationNav';
import lang from '../language/he/index.js'
import ProductsNav from '../layout/ProductsNav';
import SeriesCard from '../layout/seriesCard';

interface RouteParams {
    categoryName: string
    companyName: string
    subName: string
}

function HomePage() {
    const { categoryName, companyName, subName } = useParams<RouteParams>();
    const { categories, products } = useProducts()
    const prds = useMemo(() => _.filter(
        products,
        (prd: Product) =>
            (!companyName || prd.company === companyName) &&
            (prd.category === categoryName)
    ), [products, categoryName]) || []
    const prdSub = _.groupBy(prds, 'subcategory')

    const subcategories = useMemo(() => {
        return _.reverse(_.keys(_.groupBy(prds, 'subcategory'))) || []
    }, [prds])

    const [tab, setTab] = useState(-1)

    const getIzo = () => {
        return _.groupBy(prdSub[tab === -1 ? subcategories[0] : subcategories[tab]] || [], 'izo')
    }

    useEffect(() => {
        console.log(subcategories, subName)
        setTab(_.indexOf(subcategories, subName))
    }, [subName, subcategories])
    
    return (
        <>{ subcategories && <div className="" >
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
                },
            ]} />
            {/*<LocationNav title={[_.get(lang.category.titles, categoryName, categoryName), companyName ? lang.category.nav.company + ' ' + companyName : lang.category.nav.all_companies]} />*/}
            <div className="page container">
                <div className="section-title category">
                    {_.get(lang.category.titles, categoryName, categoryName)}
                </div>
                <div className="accordion d-sm-none" id="accordionExample">
                    {subcategories.map((sub: string, index: number) => {
                        const izo = _.groupBy(prdSub[sub] || [], 'izo')
                        return (<div className="accordion-item">
                            <h2 className="accordion-header rtl">
                                <button
                                    onClick={() => {
                                        setTab(tab === index ? -1 : index)
                                        window.scrollTo(0, 0);
                                    }
                                    }
                                    className={`accordion-button ${tab === index || subcategories.length === 1 ? '' : 'collapsed'}`}
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapseOne"
                                    aria-expanded="true"
                                    aria-controls="collapseOne">
                                    {subcategories.length === 1 && sub === "other" ? lang.subcategory.titles.all : _.get(lang.subcategory.titles, sub, sub)}
                                </button>
                            </h2>
                            <div id="collapseOne" className={`accordion-collapse collapse-drop-wrap ${tab === index || (subcategories.length === 1) ? 'show' : ''}`} data-bs-parent="#accordionExample">
                                <div className="accordion-body collapse-drop">
                                    {/*_.keys(_.omit(izo, '_')).length > 0 && < div className="caption-title color-sub container text-center">{lang.subcategory.titles.serieses}</div>*/}
                                    {_.keys(izo).map((izoName:string, index2: number) => 
                                        <div className="container series-item">
                                            <SeriesCard
                                                name={izoName === '_' ? lang.subcategory.titles.no_series : izoName}
                                                list={izo[izoName]} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>)
                    })}
                </div>
                <ul className="nav nav-tabs categories d-none d-sm-flex">
                    {subcategories.map((sub: string, index: number) =>
                        <li className="nav-item">
                            <a
                                className={`nav-link ${tab === index || tab === -1 && !index ? 'active' : ''}`}
                                onClick={() => setTab(index)}>
                                {_.get(lang.subcategory.titles, sub, sub)}
                            </a>
                        </li>
                    )}
                </ul>
                <div className="tabs-categories d-none d-sm-flex">
                    <div className="w-50 m-auto">
                    {
                        _.keys(getIzo()).map((izoName: string, index2: number) =>
                            <div className="container series-item">
                                <SeriesCard
                                    name={izoName === '_' ? lang.subcategory.titles.no_series : izoName}
                                    list={getIzo()[izoName]} />
                            </div>
                        )                       
                        }
                    </div>
                </div>
            </div>
        </div>
        }
    </>);
}



export default HomePage;
