import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import lang from "../language/he";

function Footer(props: { link?: string }) {
    const { link } = props
    const { pathname } = useLocation();
    const history = useHistory();
    return (
        <>{ pathname !== '/' &&
            <div className="container rtl pt-4 color-main">
            <div className="px-0 color-main linkable" onClick={() => link ? history.push(link) : history.goBack()}>
                    <i className="bi bi-arrow-right ps-1"></i>
                    <small>{lang.nav.back}</small>
                </div>
            </div>
        }</>
    )
}

export default Footer;
