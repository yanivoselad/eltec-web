import _ from 'lodash';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams, Link } from 'react-router-dom';
import lang from '../language/he/index.js'

interface RouteParams {
    companyName: string
}

function SeriesCard(props: { name:string,list: any[] }) {
    const { name,list } = props
    const history = useHistory();
    const { companyName } = useParams<RouteParams>();
    const [open, setOpen] = useState(false)

    return (
        <div className="card series">
            <div className="g-0 d-flex flex-column justify-content-between">
                <h6 className={`card-title details linkable ${open ? 'show' : ''}`} onClick={() => setOpen(!open)}>
                    <span className="color-main">{name}</span>
                </h6>
                <div className={`collapse-drop-wrap ${open ? 'show' : ''}`}>
                    <div className={`series-list collapse-drop`}>
                        {list.map((item, index) => {
                            return (
                                <div className="d-flex flex-row series-product linkable" onClick={() => history.push('/category/' + item.category + '/' + item.uuid)}>
                                    <div className=''>{item.formatedtitle || item.subcode || item.code}</div>
                                    <i className="bi bi-arrow-right"></i>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SeriesCard;
