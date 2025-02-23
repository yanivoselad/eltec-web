import _ from "lodash";
import { useHistory, useParams } from "react-router-dom";
import lang from "../language/he";
import { Product } from "../types";

interface RouteParams {
    categoryName: string
    companyName: string
    subName: string

}
function ProductCard(props: { item: Product, nav: Record<string, number | undefined> }) {
    const { item, nav } = props
    const history = useHistory();
    const { categoryName } = useParams<RouteParams>();
    
    return (
        <div className="">
            <div className="card product p-2">
                <table className="rtl">
                    <FieldValue name={lang.product.desciption || _.get(lang.subcategory, item.subcategory || '')} value={item.description} />
                    <FieldValue name={lang.product.id} value={item.subcode || item.code} />
                    <FieldValue name={lang.product.company} value={item.company} />
                    <FieldValue name={lang.product.series} value={item.izo} />                    
                    <FieldValue name={lang.product.grade} value={item.grade} />
                    <FieldValue name={lang.product.amount} value={item.amount} />
                </table>
                <div className="d-flex flex-row pt-3 justify-content-between" >
                    {nav.next ? <div className="px-0 linkable" onClick={() => history.push('/category/' + categoryName + '/' + nav.next)}>
                        <i className="bi bi-arrow-left ps-1"></i>
                        <small>{lang.nav.nextizo}</small>
                    </div> : <div>&nbsp;</div>}
                    {nav.back ? <div className="px-0 linkable" onClick={() => history.push('/category/' + categoryName + '/' + nav.back)}>
                        <small>{lang.nav.backizo}</small>
                        <i className="bi bi-arrow-right ps-1"></i>
                    </div> : <div>&nbsp;</div>}
                </div>
            </div>
            
        </div>
    );
}

const FieldValue = (props: { name: string, value: any }) => {
    return <tr>
        <td className="field-name col-3 d-inline-block">{props.name}:</td>
        <td className="field-value col-9 d-inline-block">{props.value || '-'}</td>
    </tr>
}

export default ProductCard;
