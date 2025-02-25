import { useHistory, useLocation } from "react-router-dom";
import lang from "../language/he";

function Sales() {
    const { pathname } = useLocation();
    const history = useHistory();
    return (
        <>{pathname !== '/sales' &&
            <div className='sales' onClick={() => history.push('/sales')}>{lang.nav.sales}</div>
        }</>
    )
}

export default Sales;
