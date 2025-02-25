import lang from '../language/he/index.js'

function SuccessMessage(props: { show?: boolean, title?: string, handleMain:any, handleAnother:any }) {
    return (
        <div className="container">
            <div className="card border-success success-message m-auto mt-5 p-3">
                <div className="card-body text-success text-center">
                    <h5 className="card-title">{lang.nav.success_sending}</h5>
                    <p className="card-text">{lang.nav.handle_request}</p>
                </div>
                <div className="gap-3 d-flex justify-content-center">
                    <button className="btn btn-success" onClick={props.handleMain}>{lang.nav.back_to_main}</button>
                    <button className="btn btn-success" onClick={props.handleAnother}>{lang.nav.send_another}</button>
                </div>
            </div>
        </div>
    );
}

export default SuccessMessage;
