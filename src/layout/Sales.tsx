import _ from "lodash";
import { useHistory, useLocation } from "react-router-dom";
import { useProducts } from "../products/components";

function Sales() {
    const { pathname } = useLocation();
    const history = useHistory();
    const { lang } = useProducts()
    return (
        <div className='sales' onClick={() => history.push('/sales')}>
            <div className="sales-form rtl m-auto d-flex flex-column flex-sm-row gap-sm-2 justify-content-center">

                <div>{pathname !== "/sales" ? _.get(lang, 'sales.ads', '') : _.get(lang, 'sales.ads_description', '')}</div>
                {pathname !== "/sales" && <b>{_.get(lang, 'nav.sales', '')}</b>}
            </div>
        </div>        
    )
}

export default Sales;
