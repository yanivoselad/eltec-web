import { useProducts } from "../products/components";
import { useParams, Link } from 'react-router-dom';

interface RouteParams {
    companyName: string
}

function CompaniesNav() {
    const { companies, filter, productsDispatch } = useProducts()
    const { companyName } = useParams<RouteParams>();
    return (
        <nav id="companies" className="navbar navbar-expand-lg bg-body-tertiary companies">
            <div className="container">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul id="companies-nav" className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to='/' className={`nav-link ${!companyName ? 'active' : ''}`} aria-current="page">All Companies</Link>
                        </li>
                    
                    {companies && companies.map(
                        (company, index) => <li key={index} className="nav-item">
                            <Link
                                className={`nav-link ${companyName === company ? 'active' : ''}`}
                                to={`/company/${company}`}

                            >{company}</Link>
                        </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default CompaniesNav;
