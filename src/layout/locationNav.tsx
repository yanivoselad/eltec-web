import { useHistory } from 'react-router-dom';
interface Props {
    title?: string
    noBreadcrumbs?: boolean
}

function LocationNav(props: Props) {
    const { title, noBreadcrumbs } = props
    const history = useHistory();
    return (
        <div className="location-nav" >
            {!noBreadcrumbs ?
                <div className="bread container">Home</div>
                : <div>&nbsp;</div>
            }
            <div className="page-title  container">
                <h4>{title}</h4>
            </div>
        </div>
    );
}

export default LocationNav;
