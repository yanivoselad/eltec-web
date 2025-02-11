import { useProducts } from "../products/components";
import { useParams, Link } from 'react-router-dom';
import { useState } from "react";

interface RouteParams {
    companyName: string
}

function CompaniesNav() {
    const { companies, filter, productsDispatch } = useProducts()
    const { companyName } = useParams<RouteParams>();
    const [open, setOpen] = useState(false)
    return (
        <nav id="companies" className="navbar navbar-expand-lg bg-body-tertiary companies d-none d-sm-flex">
            <div className="container">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupported" aria-controls="navbarSupported" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" onClick={() => setOpen(!open)}></span>
                </button>
                <div className={`collapse navbar-collapse ${open ? 'show' : ''}`} id="navbarSupported">
                    <ul id="companies-nav" className="navbar-nav me-auto mb-2 mb-lg-0" onClick={() => setOpen(!open)}>                   
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
