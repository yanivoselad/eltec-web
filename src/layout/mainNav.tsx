import _ from "lodash";
import { useEffect, useRef, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import lang from "../language/he";
import { useProducts } from "../products/components";
import { Product } from "../types";
import CompaniesNav from "./companiesNav";
import ProductCardRow from "./productCardRow";

interface RouteParams {
    companyName: string
    categoryName: string
}

function MainNav() {
    const { products, companies, categories } = useProducts()
    const { companyName, categoryName } = useParams<RouteParams>();
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState<Product[]>([])
    const [totalResults, setTotalResults] = useState<Number>(0)
    const inputRef = useRef<HTMLInputElement>(null); // Reference to the input
    const [open, setOpen] = useState(false)
    const [openSearch, setOpenSearch] = useState(false)
    const [openMenu, setOpenMenu] = useState(false)
    const [subopen, setSubOpen] = useState<string | undefined>(undefined)
    const history = useHistory()

    const onOutsideClick = () => {
        setOpenSearch(false)
        setSearchTerm('')
    }

    useEffect(() => {
        // Only trigger search if input has more than 2 characters
        
            const delayDebounce = setTimeout(() => {
                //onSearch(searchTerm);
                if (searchTerm !== '') {
                    const res = _.filter(products, (product) => {
                        const find = _.toLower(product?.subcode || product?.code)
                        return find.includes(_.toLower(searchTerm))
                    })
                    //setResults(_.slice(res, 0, 10))
                    setResults(res)
                    setTotalResults(res.length)
                    setOpen(res.length > 0 && searchTerm !== '')
                }
            }, 500); // 0.5-second delay

            return () => clearTimeout(delayDebounce); // Cleanup timeout on each keystroke
        
    }, [products,searchTerm]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
                onOutsideClick();
            }
        }
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);


    return (
        <div className="sticky-top" ref={inputRef}>
        <nav className="mainnav navbar navbar-expand-lg bg-body-tertiary ">
            <div className="container-fluid">
                <div className="navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-slg-0">
                            <li className="nav-item d-sm-none">
                                <i className="bi bi-list fs-2" onClick={() => setOpenMenu(!openMenu)}></i>
                            </li>
                            <li className="nav-item">
                                <div><Link className="nav-link" aria-current="page" to="/">{lang.nav.company}</Link></div>
                            </li>
                            <li className="nav-item">
                                <i className="bi bi-search" onClick={() => setOpenSearch(!openSearch)}></i>
                            </li>
                    </ul>
                </div>
            </div>
            </nav>
            <div  className={`offcanvas offcanvas-end ${openSearch ? 'show' : ''}`}>
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasLabel">{lang.nav.find}</h5>
                    <button type="button" className="btn btn-close" onClick={() => setOpenSearch(!openSearch)}></button>
                </div>
                <div className="container-fluid search-wrap">
                    <form className="d-flex" onSubmit={(event) => {
                        event.preventDefault(); // Stops form submission
                        /*setOpen(false)
                        if (!_.isEmpty(searchTerm)) {
                            inputRef?.current?.blur();
                            if (inputRef.current) {
                                inputRef.current.value = ''; // Set input value to empty
                            }
                            setSearchTerm('')s
                            history.push('/results/' + searchTerm)
                        }*/
                    }}
                        style={{ position: "relative" }} id="myForm" role="search">
                        <div className='w-100'>
                            <input autoComplete="off" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} id="search" className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            {!_.isEmpty(searchTerm) && < div className='text-end'><small>{lang.nav.found} <b>{totalResults}</b> {lang.nav.totalresutls}</small></div>}
                        </div>
                        <div className='divider'></div>

                    </form>
                </div>
                {open && searchTerm !== '' && <div className="search-results-menu" onClick={onOutsideClick}>

                    {
                        results.map((res: Product, index: number) => <div onClick={() => {
                            //history.push('/company/' + res.company + '/' + res.category + '/' + res._id)
                        }}><ProductCardRow key={index} searchMode item={res} /></div>)

                    } </div>}
            </div>
            <div className={`offcanvas offcanvas-start ${openMenu ? 'show' : ''}`}>
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasLabel">{lang.nav.main_menu}</h5>
                    <button type="button" className="btn-close" onClick={() => setOpenMenu(!openMenu)}></button>
                </div>
                <div className='p-3 row'>
                    <div className="col-6" >
                        <div className='nav-header-link'>{lang.nav.companies}</div>
                        <ul id="companies-nav" className="navbar-nav p-0 me-auto mb-2 mb-lg-0 rtl">
                            {companies && companies.map(
                                (company, index) => <li key={index} className="nav-item">
                                    <Link
                                        onClick={() => { setOpenMenu(!openMenu)}}
                                        className={`nav-link ${companyName === company ? 'active' : ''}`}
                                        to={`/company/${company}`}
                                    >{company}</Link>
                                </li>
                            )}
                        </ul>
                    </div>
                    <div className="col-6" >
                        <div className='nav-header-link'>{lang.category.nav.products}</div>
                        <ul className="navbar-nav p-0 rtl">
                            {categories && categories.map(
                                (category, index) => <li
                                    key={index}
                                    className={`nav-item ${category.subcategories.length > 1 ? 'dropdown' : ''}`}
                                    onClick={() => {
                                        setSubOpen(subopen === 'sub' + index ? undefined : 'sub' + index)
                                    }}>
                                    <Link
                                        onClick={() => { category.subcategories.length < 2 && setOpenMenu(!openMenu) }}
                                        className={`nav-link ${categoryName === category.name ? 'active' : ''} ${category.subcategories.length > 1 ? 'dropdown-toggle' : ''}`}
                                        to={`${category.subcategories.length > 1 ? '#' : `/category/${category.name}`}`}
                                        id="navbarDropdownMenuLink"

                                    >{_.get(lang, 'category.titles.' + category.name)} </Link>
                                    {category.subcategories.length > 1 &&
                                        <div className={`dropdown-menu p-0 ${subopen === 'sub' + index ? 'show' : ''}`}>
                                            {category.subcategories.map(
                                                (subcategory: string, index2: number) =>
                                                    subcategory !== "other" && <Link
                                                        key={index2 + 100}
                                                        className={`dropdown-item`}
                                                        to={`/category/${category.name}/sub/${subcategory}`}
                                                        onClick={() => {
                                                            setOpen(!open)
                                                            setOpenMenu(!openMenu)
                                                        }}

                                                    >{_.get(lang, 'subcategory.titles.' + subcategory, subcategory)}</Link>
                                            )}
                                        </div>}
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default MainNav;
