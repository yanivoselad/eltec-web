import { useHistory } from "react-router-dom";

function ProductCard( props :{ item: any }) {
    const { item } = props
    const history = useHistory();
    let descriptions = item.description || ''
    descriptions = descriptions.split(',')
    return (
        <div className="container">
            <div className="card product">
                <div className="row g-0">
                    <div className="col-md-4">
                        <h6 className="cardTitle">{item.company}</h6>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h6 className="card-title">{item.subcode || item.code}</h6>
                            <p className="card-text" style={{ textAlign:"right" }}>
                                {descriptions.map((description: string, index: number) =>
                                    <div><small key={index} className="text-body-secondary">{description}</small></div>
                                )}
                            </p>
                            <p className="card-text amount"><small className="text-body-secondary">In stock: {item.amount}</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
