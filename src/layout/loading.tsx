import lang from '../language/he/index.js'

function Loading(props: { style?: string, title?:string }) {
    return (
        <div className={`loading ${props.style}`}>
            <div className="loading-icon"><img src="/images/loading.png" /></div>
            <div>{props.title || lang.nav.loading}...</div>
        </div>
    );
}

export default Loading;
