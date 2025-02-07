import _ from 'lodash';
import { useHistory } from 'react-router-dom';
import { useParams, Link } from 'react-router-dom';
import lang from '../language/he/index.js'

interface RouteParams {
    companyName: string
}

function CategoryCard(props: { item: any }) {
    const { item } = props
    const history = useHistory();
    const { companyName } = useParams<RouteParams>();
    const linkToCategory = companyName ? `/company/${companyName}/${item.name}` : '/category/' + item.name

    return (
        <div className="col-lg-2 col-md-2 col-sm-12 mb-3" >
            <div className="card category" onClick={() => history.push(linkToCategory)}>
                <div className="g-0 d-flex flex-column flex-sm-row justify-content-between">
                    <div className="col-md-4 card-image-bg category  d-flex flex-row flex-sm-column">
                        {!companyName && item.companies.map((company: string, index: number) =>
                            <h6 key={index} className="cardTitle category">{company}</h6>
                        )}
                        {companyName && <h6 className="cardTitle category">{companyName}</h6>}
                    </div>
                    <div className="col-md-8 mb-4">
                        <div className="card-body">
                            <h6 className="card-title fs-sm-6">{`${_.get(lang.category.titles, item.name)}`}</h6>
                            <p className="card-text amount"><small className="text-body-secondary">{companyName ? item.amount.companies[companyName] : item.amount.total} סוגי פריטים </small></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CategoryCard;
