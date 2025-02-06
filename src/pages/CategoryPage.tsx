
import ProductsCards from '../layout/productsCards';
import { useProducts } from "../products/components";
import { useParams } from 'react-router-dom';
import _ from 'lodash'
import { useState } from 'react';
import { Product } from '../types';
import CompaniesNav from '../layout/companiesNav';
import LocationNav from '../layout/locationNav';
import lang from '../language/he/index.js'

interface RouteParams {
    categoryName: string
    companyName: string
}

function HomePage() {
    const [tab, setTab] = useState(0)
    const { categories, products } = useProducts()
    const { categoryName, companyName } = useParams<RouteParams>();
    const prds = _.filter(
        products,
        (prd: Product) =>
            (!companyName || prd.company === companyName) &&
            (prd.category === categoryName
            || (!prd.category && categoryName === "other"))
    ) || []

    const category = _.find(categories, { name: categoryName }) || {}
    const subcategories = _.get(category, 'subcategories', ['other'])
    const prdSub = _.filter(
        prds,
        (prd: Product) => prd.subcategory === subcategories[tab]
            || (_.isEmpty(prd.subcategory) && subcategories[tab] === "other")
    ) || []
    return (
        <div className="">
            <CompaniesNav />
            <LocationNav title={`${_.get(lang.category.titles, categoryName, categoryName)}`} />
            <div className="page container">
                <ul className="nav nav-tabs categories">
                    {subcategories.map((sub:string, index:number) =>
                        <li className="nav-item">
                            <a
                                className={`nav-link ${tab === index ? 'active' : ''}`}
                                onClick={() => setTab(index)}>
                                {sub}
                            </a>
                        </li>
                    )}
                </ul>
                <div className="tabs-categories">
                    <ProductsCards products={prdSub} />
                    </div>
                    </div>
            </div>
    );
}

export default HomePage;
