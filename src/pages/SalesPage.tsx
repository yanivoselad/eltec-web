
import CompaniesNav from '../layout/companiesNav';
import { useProducts } from '../products/components';
import lang from '../language/he/index.js'
import ProductsNav from '../layout/ProductsNav';
import { useState } from 'react';
import _ from 'lodash';
import { initialContactValues, lambadaURL, recaptchaKEY } from '../consts';
import Loading from '../layout/loading';
import SuccessMessage from '../layout/successMessage';
import { useHistory } from 'react-router-dom';
import Sales from '../layout/Sales';
import LocationNav from '../layout/locationNav';

declare global {
    interface Window {
        grecaptcha?: {
            ready: (callback: () => void) => void;
            execute: (siteKey: string, options: { action: string }) => Promise<string>;
        };
    }
}

function SalesPage() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^0\d{9}$/;
    const [sending, setSending] = useState<boolean>(false)
    const [sent, setSent] = useState<boolean>(false)
    const history = useHistory()

    const [values, setValues] = useState<Record<string, string>>(initialContactValues)
    const [valids, setValids] = useState<Record<string, string>>(initialContactValues)

    const updateValues = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
        setValids({
            ...valids,
            [e.target.name]: validate(e.target.name, e.target.value)
        })
    };

    const validate = (name:string, value:string) => {
        if (_.isEmpty(_.trim(value, ' '))) {
            return 'is-invalid'
        }
        if (name === 'email' && !emailRegex.test(value)) {
            return 'is-invalid'
        }
        if (name === 'phone' && !phoneRegex.test(value)) {
            return 'is-invalid'
        }
        return 'is-valid'
    }

    return (
        <div>
            <CompaniesNav />
            <ProductsNav />
            <Sales />
            <LocationNav noBreadcrumbs title={[]}/>
            <div className="page">
                {sending || sent ? (sent ?
                    <SuccessMessage
                        show={true}
                        handleMain={() => history.push('/')}
                        handleAnother={() => setSent(false)}
                    /> : <Loading style="locale" title={lang.nav.sending} />) :
                    <><div className="container">
                    <div className="section-title rtl text-center">
                        {lang.sales.title}
                    </div>
                    </div>
                    <form className='container sales-form rtl' onSubmit={(e) => {
                        e.preventDefault();
                        let vObj: Record<string, string> = {}
                        _.keys(values).forEach((name) => {
                            vObj[name] = validate(name, values[name])
                        })
                        setValids(vObj)
                        if (!_.values(vObj).includes('is-invalid') && window?.grecaptcha) {
                            try {
                                window.grecaptcha.ready(() => {
                                    if (window.grecaptcha) { // Ensure grecaptcha is still defined before calling execute
                                        setSending(true)
                                        window.grecaptcha
                                            .execute(recaptchaKEY, { action: 'contact' })
                                            .then(async (token: string) => {

                                                await fetch(lambadaURL, {
                                                    method: "POST",
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                        'Authorization': token
                                                    },
                                                    body: JSON.stringify(values)
                                                }).then((res: any) => {
                                                    window && window.scrollTo(0, 0);
                                                    setSending(false)
                                                    setSent(true)
                                                    setValues(initialContactValues)
                                                    setValids(initialContactValues)
                                                }).catch((error) => {
                                                    setSending(false)
                                                });

                                            })
                                            .catch((error) => {
                                                setSending(false)
                                                console.error('Error executing reCAPTCHA:', error);
                                            });
                                    }
                                });
                            } catch (e) {
                                console.error('reCAPTCHA error:', e);
                            }
                        }

                    }}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">{lang.sales.fields.name}*</label>
                            <input type="text" className={`form-control ${valids.name}`} name="name" id="name" onChange={updateValues} value={values.name} />
                            <div className="invalid-feedback">
                                {lang.sales.validation.required}
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">{lang.sales.fields.email}*</label>
                            <input type="text" className={`form-control ${valids.email}`} name="email" id="email" value={values.email} onChange={updateValues} placeholder="name@example.com" />
                            <div className="invalid-feedback">
                                {_.isEmpty(_.trim(values.email, ' ')) ? lang.sales.validation.required : lang.sales.validation.invalid_email}
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">{lang.sales.fields.phone}*</label>
                            <input type="text" className={`form-control ${valids.phone}`} name="phone" id="phone" value={values.phone} onChange={updateValues} />
                            <div className="invalid-feedback">
                                {_.isEmpty(_.trim(values.phone, ' ')) ? lang.sales.validation.required : lang.sales.validation.invalid_phone}
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="message" className="form-label">{lang.sales.fields.message}*</label>
                            <textarea className={`form-control ${valids.message}`} id="message" name='message' rows={3} value={values.message} onChange={updateValues} />
                            <div className="invalid-feedback">
                                {lang.sales.validation.required}
                            </div>
                        </div>
                        <button type="submit" className="btn">Submit</button>
                    </form></>}
            </div>
        </div>
    );
}

export default SalesPage;
