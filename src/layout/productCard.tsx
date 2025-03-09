import _ from "lodash";
import { useHistory, useParams } from "react-router-dom";

import { useProducts } from "../products/components";
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
    const { lang } = useProducts()
    
    return (
        <div className="">
            <div className="card product p-2">
                <table className="rtl">
                    <FieldValue name={_.get(lang, 'product.desciption', '') || _.get(lang, 'subcategory, item.subcategory', '')} value={item.description || _.get(lang, 'subcategory.titles.'+item.subcategory)} />
                    <FieldValue name={_.get(lang, 'product.id', '')} value={item.subcode || item.code} />
                    <FieldValue type='img' name={_.get(lang, 'product.company', '')} value={item.company} />
                    <FieldValue name={_.get(lang, 'product.series', '')} value={item.izo} />
                    <FieldValue name={_.get(lang, 'product.grade', '')} value={item.grade} />
                    <FieldValue name={_.get(lang, 'product.amount', '')} value={item.amount} />
                </table>
                <div className="d-flex flex-row pt-3 justify-content-between" >
                    {nav.next ? <div className="px-0 linkable" onClick={() => history.push('/category/' + categoryName + '/' + nav.next)}>
                        <i className="bi bi-arrow-left ps-1"></i>
                        <small>{_.get(lang, 'nav.nextizo', '')}</small>
                    </div> : <div>&nbsp;</div>}
                    {nav.back ? <div className="px-0 linkable" onClick={() => history.push('/category/' + categoryName + '/' + nav.back)}>
                            <small>{_.get(lang, 'nav.backizo', '')}</small>
                        <i className="bi bi-arrow-right ps-1"></i>
                    </div> : <div>&nbsp;</div>}
                </div>
            </div>
            
        </div>
    );
}

const FieldValue = (props: { name: string, value: any, type?: any }) => {
    const val = String(props.value) || '-'
    const vals = val.split(',')
    return <tr>
        <td className="field-name col-3 d-inline-block py-2" valign="top">{props.name}:</td>
        <td className="field-value col-9 d-inline-block py-2" valign="top">{
            props.type === "img" ?
                <img src={'/images/' + props.value + '.png'} width="80" /> :
                vals.map((v: string, inx: number) => <span key={inx}>{v}<br/></span>)}</td>
    </tr>
}

export default ProductCard;
