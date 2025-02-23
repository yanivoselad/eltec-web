import lang from "../language/he";

function Footer(props: { link?: string }) {
    return (

        <footer className="bd-footer py-4 py-md-5 mt-5 bg-body-tertiary">
            <div className="text-center all-rights">
                <small className='color-sec'>{lang.nav.all_rights} ©</small>
            </div>
        </footer>
    )
}

export default Footer;
