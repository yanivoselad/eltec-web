
import { useProducts } from "../products/components";
import { useParams } from 'react-router-dom';
import _ from 'lodash'
import { useEffect, useMemo, useState } from 'react';
import { Product } from '../types';
import CompaniesNav from '../layout/companiesNav';
import LocationNav from '../layout/locationNav';
import ProductsNav from '../layout/ProductsNav';
import SeriesCard from '../layout/seriesCard';
import Sales from '../layout/Sales';

interface RouteParams {
    categoryName: string
    companyName: string
    subName: string
}

function HomePage() {
    const { categoryName, companyName, subName } = useParams<RouteParams>();
    const { lang, products } = useProducts()

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


    const [tab, setTab] = useState<string | undefined>()

    const getIzo = () => {
        return _.groupBy(prdSub[tab === undefined ? subcategories[0] : tab] || [], 'izo')
    }

    useEffect(() => {
        setTab(subName)
    }, [subName, subcategories])
    
    return (
        <>{ subcategories && <div className="" >
            <CompaniesNav />
            <ProductsNav />
            <Sales />
            <LocationNav title={[
                {
                    title: _.get(lang,'nav.home'),
                    link: '/',
                },
                {
                    title: companyName ? companyName : _.get(lang, 'category.nav.categories'),
                    link: companyName ? '/company/' + companyName : '/',
                },
                {
                    title: _.get(lang ,'category.titles.'+ categoryName, categoryName),
                },
            ]} />
            {/*<LocationNav title={[_.get(lang.category.titles, categoryName, categoryName), companyName ? lang.category.nav.company + ' ' + companyName : lang.category.nav.all_companies]} />*/}
            <div className="page container">
                <div className="section-title category">
                    {_.get(lang, 'category.titles.' + categoryName, categoryName)}
                </div>
                <div className="accordion d-sm-none" id="accordionExample">
                    {_.reverse(_.orderBy(subcategories)).map((sub: string, index: number) => {
                        const izo = _.groupBy(prdSub[sub] || [], 'izo')
                        const total = _.reduce(prdSub[sub], (sum, prod) => sum + Number(prod.amount), 0)
                        return (<div className="accordion-item" key={index}>
                            <h2 className="accordion-header rtl">
                                <button
                                    onClick={() => {
                                        setTab(tab === sub ? undefined : sub)
                                    }}
                                    className={`accordion-button ${subcategories.length === 1 ? 'no-arrow' : ''} ${tab === sub || subcategories.length === 1 ? '' : 'collapsed'}`}
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapseOne"
                                    aria-expanded="true"
                                    aria-controls="collapseOne">
                                    {subcategories.length === 1 && sub === "_" ? _.get(lang, 'subcategory.titles.all') : _.get(lang, 'subcategory.titles.' + sub, sub)}&nbsp;<span className="extra-small-text">({total} {_.get(lang,'nav.items')})</span>
                                </button>
                            </h2>
                            <div id="collapseOne" className={`accordion-collapse collapse-drop-wrap ${tab === sub || (subcategories.length === 1) ? 'show' : ''}`} data-bs-parent="#accordionExample">
                                <div className="accordion-body collapse-drop">
                                    {/*_.keys(_.omit(izo, '_')).length > 0 && < div className="caption-title color-sub container text-center">{lang.subcategory.titles.serieses}</div>*/}
                                    {_.sortBy(_.keys(izo)).map((izoName: string, index2: number) =>
                                        <div className="container series-item" key={index2}>
                                            <SeriesCard
                                                name={izoName}
                                                list={izo[izoName]} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>)
                    })}
                </div>
                <ul className="nav nav-tabs categories d-none d-sm-flex">
                    {_.reverse(_.orderBy(subcategories)).map((sub: string, index: number) => {
                        const total = _.reduce(prdSub[sub], (sum, prod) => sum + Number(prod.amount), 0)
                        return <li className="nav-item">
                            <a
                                className={`nav-link ${tab === sub || tab === undefined && !index ? 'active' : ''}`}
                                onClick={() => setTab(sub)}>
                                {subcategories.length === 1 && sub === "_" ? _.get(lang, 'subcategory.titles.all') : _.get(lang, 'subcategory.titles.' + sub, sub)}&nbsp;<span className="extra-small-text">({total} {_.get(lang, 'nav.items')})</span>
                            </a>
                        </li>
                    })}
                </ul>
                <div className="tabs-categories d-none d-sm-flex">
                    <div className="w-50 m-auto">
                        {
                            _.sortBy(_.keys(getIzo())).map((izoName: string, index2: number) =>
                            <div className="container series-item">
                                <SeriesCard
                                    //name={izoName === '_' ? lang.subcategory.titles.no_series : izoName}
                                        name={izoName}
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
