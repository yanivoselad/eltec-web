import _ from "lodash";
import { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import lang from "../language/he";
import { useProducts } from "../products/components";
import { Product } from "../types";

function MainNav() {
    const { products } = useProducts()
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState<Product[]>([])
    const [totalResults, setTotalResults] = useState<Number>(0)
    const inputRef = useRef<HTMLInputElement>(null); // Reference to the input
    const [open, setOpen] = useState(false)
    const history = useHistory()

    const onOutsideClick = () => {
        setOpen(false)
    }

    useEffect(() => {
        // Only trigger search if input has more than 2 characters
        
            const delayDebounce = setTimeout(() => {
                //onSearch(searchTerm);
                console.log(searchTerm)
                const res = _.filter(products, (product) => {
                    const find = _.toLower(product?.subcode || product?.code)
                    return find.includes(_.toLower(searchTerm))
                })
                setResults(_.slice(res, 0, 10))
                setTotalResults(res.length)
                setOpen(res.length > 0 && searchTerm !== '')

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
        <nav className="mainnav navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <div className="navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <h3><Link className="nav-link" aria-current="page" to="/">A.E. Technologies</Link></h3>
                        </li>
                    </ul>
                    <form className="d-flex" onSubmit={(event) => {
                        event.preventDefault(); // Stops form submission
                        setOpen(false)
                        if (!_.isEmpty(searchTerm)) {
                            inputRef?.current?.blur();
                            if (inputRef.current) {
                                inputRef.current.value = ''; // Set input value to empty
                            }
                            history.push('/results/' + searchTerm)
                        }
                    }}
                        style={{ position: "relative" }} id="myForm" role="search">
                        <input autoComplete="off" ref={inputRef} onChange={(e) => setSearchTerm(e.target.value)} id="search" className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        {open && <div className="search-results-menu">{
                            results.map((res: Product, index: number) => <div onClick={() => {
                                //history.push('/company/' + res.company + '/' + res.category + '/' + res._id)
                            }}>{res?.subcode || res?.code}</div>)

                        } {totalResults > 10 && <div><small>...{lang.nav.found} {totalResults} {lang.nav.totalresutls}</small></div>}</div>}
                    </form>
                </div>
            </div>
        </nav>  
    );
}

export default MainNav;
