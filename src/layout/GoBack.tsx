import _ from "lodash";
import { useHistory, useLocation } from "react-router-dom";
import { useProducts } from "../products/components";


function GoBack(props: { link?: string }) {
    const { link } = props
    const { pathname } = useLocation();
    const history = useHistory();
    const { lang } = useProducts()
    return (
        <>{ pathname !== '/' &&
            <div className="container rtl pt-4 color-main">
            <div className="px-0 color-main linkable" onClick={() => link ? history.push(link) : history.goBack()}>
                    <i className="bi bi-arrow-right ps-1"></i>
                <small>{_.get(lang, 'nav.back', '')}</small>
                </div>
            </div>
        }</>
    )
}

export default GoBack;
