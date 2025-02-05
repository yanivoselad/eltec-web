import { useProducts } from "../products/components";

function CompaniesNav() {
    const { companies, filter, productsDispatch } = useProducts()
    return (
        <nav id="companies" className="navbar navbar-expand-lg bg-body-tertiary companies">
            <div className="container">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul id="companies-nav" className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className={`nav-link ${!filter?.company ? 'active' : ''}`} aria-current="page">All Companies</a>
                        </li>
                    
                    {companies && companies.map(
                        (company, index) => <li key={index} className="nav-item">
                            <a 
                                className={`nav-link ${filter?.company === company ? 'active' : ''}`}
                                aria-current="page"
                                    onClick={() => {
                                        productsDispatch({ type: "selectCompany", payload: company })
                                    }
                                }
                            >{company}</a>
                        </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default CompaniesNav;
