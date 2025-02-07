function ProductCardRow( props :{ item: any }) {
    const { item } = props
    let descriptions = item.description || ''
    descriptions = descriptions.replaceAll(',',' | ')
    return (
        <div className="col-lg-12 col-md-12 col-sm-12 mb-3">
            <div className="card product-row">
                <div>
                    <h6 className="cardTitle">{item.company}</h6>
                    <p className="card-text"><small className="text-body-secondary">In stock: {item.amount}</small></p>
                </div>
                <div className="product-details">
                            
                    <div className="card-text details" style={{ textAlign: "right" }}>
                        {descriptions}
                            {/*descriptions.map((description: string, index: number) =>
                                <div key={index} className="text-body-secondary">{description}</div>
                            )*/}
                        </div>
                    <h6 className="card-title details">{item.subcode || item.code}</h6>
                        </div>
            </div>
        </div>
    );
}

export default ProductCardRow;
