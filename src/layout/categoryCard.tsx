function CategoryCard( props :{ item: any }) {
    const { item } = props
    return (
        <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
            <div className="card">
                <div className="row g-0">
                    <div className="card-body">
                        <h6 className="card-title">sdsdsdsdsdsd</h6>
                        <p className="card-text"><small className="text-body-secondary">{item.description}</small></p>
                        <p className="card-text amount"><small className="text-body-secondary">In stock: {item.amount}</small></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CategoryCard;
