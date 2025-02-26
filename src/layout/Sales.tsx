import { useHistory, useLocation } from "react-router-dom";
import lang from "../language/he";

function Sales() {
    const { pathname } = useLocation();
    const history = useHistory();
    return (
        <div className='sales' onClick={() => history.push('/sales')}>
            <div className="sales-form rtl m-auto d-flex flex-column flex-sm-row gap-sm-2 justify-content-center">

                <div>{pathname !== "/sales" ? lang.sales.ads : lang.sales.ads_description}</div>
                {pathname !== "/sales" && <b>{lang.nav.sales}</b>}
            </div>
        </div>        
    )
}

export default Sales;
