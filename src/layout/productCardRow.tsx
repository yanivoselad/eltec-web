import _ from "lodash";
import { useHistory, useLocation } from "react-router-dom";
import lang from "../language/he";

function ProductCardRow(props: { item: any, searchMode?: boolean }) {
    const { item, searchMode = false } = props
    const history = useHistory()
    const location = useLocation()
    let descriptions = item.description || ''
    descriptions = descriptions.replaceAll(',',' | ')
    return (
        <div className="col-lg-12 col-md-12 col-sm-12 mb-3" style={{ cursor: 'pointer' }}>
            {searchMode && <div className="card-text search-card-title">
                {_.get(lang.category.titles, item.category)} | 
                {_.get(lang.subcategory.titles, item.subcategory)}
            </div>}
            <div className="card product-row">

                <div className="product-details" onClick={(() => {
                    history.push('/category/' + item.category + '/' + item.uuid)
                })} >

                    <h6 className="card-title details">{item.subcode || item.code}</h6>
                    <div className="card-text details" style={{ textAlign: "right" }}>
                        {descriptions}
                            {/*descriptions.map((description: string, index: number) =>
                                <div key={index} className="text-body-secondary">{description}</div>
                            )*/}
                        </div>                    
                </div>
                <div className='flex-row bottom-details'>
                    <h6 className="cardTitle">{item.company}</h6>
                    {!searchMode && <div className="card-text">In stock: {item.amount}</div>}
                </div>
            </div>
        </div>
    );
}

export default ProductCardRow;
