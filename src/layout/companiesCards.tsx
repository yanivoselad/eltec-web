import CategoryCard from "./categoryCard";

interface Props {
    companies: string[],

}

function CompaniesCards(props: Props) {
    const { companies } = props
    return (
        <div className="container products">
            <div id="products" className="row g-3 g-sm-5 justify-content-center">
                {companies.map((category:any, index:number) => {
                return (
                    <div className = "col-2 col-lg-3 col-md-4 col-xl-1" >
                        <div className="logos text-center ">
                            <img src={`../images/${category}.png`} />
                        </div>                
                    </div>
                )
            })}
            </div>
        </div>
    );
}

export default CompaniesCards;
