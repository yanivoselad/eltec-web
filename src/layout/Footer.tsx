import _ from "lodash";
import { useProducts } from "../products/components";

function Footer(props: { link?: string }) {
    const { lang } = useProducts()
    return (
        <footer className="bd-footer bg-body-tertiary">            
            <div className="text-center all-rights">
                <small className='color-sec'>{_.get(lang,'nav.all_rights','')} ©</small>
            </div>
        </footer>
    )
}

export default Footer;
