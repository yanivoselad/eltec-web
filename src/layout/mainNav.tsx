import { useProducts } from "../products/components";

function MainNav() {
    const prod = useProducts()
    console.log(prod)
    return (
        <nav className="mainnav navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <div className="navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <h3><a className="nav-link" aria-current="page" href="/">A.E. Technologies</a></h3>
                        </li>
                    </ul>
                    <form className="d-flex" id="myForm" role="search">
                        <input id="search" className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>  
    );
}

export default MainNav;
