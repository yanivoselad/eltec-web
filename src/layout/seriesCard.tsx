import _ from 'lodash';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useProducts } from "../products/components";
import { Product } from '../types.js';

function SeriesCard(props: { name:string,list: any[] }) {
    const { name, list } = props
    const { lang } = useProducts()
    const history = useHistory();
    const [open, setOpen] = useState(false)
    const total = _.reduce(list, (sum, item) => sum + Number(item.amount), 0)
    const companies = _.keys(_.groupBy(list, 'company'))
    return (
        <div className="card series">
            <div className="g-0 d-flex flex-column justify-content-between">
                <h6 className={`card-title details linkable ${name === '_' ? 'no-link' : ''} ${open ? 'show' : ''}`} onClick={() => setOpen(!open)}>
                    {name === '_' ? <span className="color-main flex-grow-1">{_.get(lang, 'subcategory.titles.no_series', '')}</span> : <span className="color-main">{name}&nbsp;<small>{_.get(lang, 'subcategory.titles.series', '')}</small></span>}
                    <div className="g-0 d-flex flex-row align-items-center ">
                        <div className={`series-amount d-flex align-items-center gap-2 color-sec extra-small-text rtl`}>
                            <small>{total} {_.get(lang, 'nav.items', '')} </small>
                            <div>{companies.map((company, inx3) => <img key={inx3} width="50" src={'/images/' + company + '.png'} />)}</div>                            
                        </div></div>
                </h6>
                <div className={`collapse-drop-wrap ${open || name === '_' ? 'show' : ''}`}>
                    <div className={`series-list collapse-drop`}>
                        {list.map((item: Product, index) => {
                            return (
                                <div key={index} className="d-flex flex-row series-product linkable gap-1 align-items-center" onClick={() => history.push('/category/' + item.category + '/' + item.uuid)}>
                                    <div className='flex-grow-1'>{item.formatedtitle || item.subcode || item.code}</div>
                                    {item.grade && <div className="pill">{item.grade}</div> }
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
