import { useHistory, useLocation } from "react-router-dom";
import lang from "../language/he";

function Sales() {
    const { pathname } = useLocation();
    const history = useHistory();
    return (
        <div className='sales' onClick={() => history.push('/sales')}>
            <div className="container rtl d-flex flex-column flex-sm-row gap-sm-2 ">
                <div>{lang.sales.ads}</div>
                <b>{lang.nav.sales}</b>
            </div>
        </div>        
    )
}

export default Sales;
