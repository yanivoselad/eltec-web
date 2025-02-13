import _ from "lodash";
import { useHistory, useLocation } from "react-router-dom";

function ProductCardRow(props: { item: any }) {
    const { item } = props
    const history = useHistory()
    const location = useLocation()
    let descriptions = item.description || ''
    descriptions = descriptions.replaceAll(',',' | ')
    return (
        <div className="col-lg-12 col-md-12 col-sm-12 mb-3" style={{ cursor: 'pointer' }}
            onClick={(() => {
                history.push('/category/' +item.category+ '/' + item.uuid)
            })} >
            <div className="card product-row">

                <div className="product-details">
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
                    <div className="card-text">In stock: {item.amount}</div>
                </div>
            </div>
        </div>
    );
}

export default ProductCardRow;
