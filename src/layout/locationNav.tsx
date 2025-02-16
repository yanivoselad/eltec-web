import { Link, useHistory } from 'react-router-dom';
interface Props {
    title: Record<string,string>[]
    noBreadcrumbs?: boolean
}

function LocationNav(props: Props) {
    const { title, noBreadcrumbs } = props
    const history = useHistory();
    return (
        <div className="location-nav" >
            {/*!noBreadcrumbs ?
                <div className="bread container">Home</div>
                : <div>&nbsp;</div>
            */}
            <div className="page-title d-flex container">
                {title.map((item: Record<string, string>, index: number) => {
                    return (
                        <div key={index} className="d-flex page-title-item">
                            {index > 0 && <i className="bi bi-arrow-left"></i>}
                            {item.link ? <Link to={item.link}>{item.title}</Link> : <div className='text'>{item.title}</div>}

                        </div>
                    )
                })}                
            </div>
        </div>
    );
}

export default LocationNav;
