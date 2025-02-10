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
                            {index > 0 && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-left-fill" viewBox="0 0 16 16">
                                <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                            </svg>}
                            {item.link ? <Link to={item.link}>{item.title}</Link> : <div>{item.title}</div>}

                        </div>
                    )
                })}                
            </div>
        </div>
    );
}

export default LocationNav;
