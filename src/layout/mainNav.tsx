import _ from "lodash";
import { relative } from "path/posix";
import { useEffect, useMemo, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useProducts } from "../products/components";
import { Product } from "../types";

function MainNav() {
    const { products } = useProducts()
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState<Product[]>([])
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
                setResults(_.slice(res, 0, 5))
                setOpen(res.length > 0 && searchTerm !== '')

            }, 500); // 0.5-second delay

            return () => clearTimeout(delayDebounce); // Cleanup timeout on each keystroke
        
    }, [searchTerm]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
                onOutsideClick();
            }
        }
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [onOutsideClick]);


    return (
        <nav className="mainnav navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <div className="navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <h3><a className="nav-link" aria-current="page" href="/">A.E. Technologies</a></h3>
                        </li>
                    </ul>
                    <div className="d-flex" style={{ position: "relative" }} id="myForm" role="search">
                        <input ref={inputRef} onChange={(e) => setSearchTerm(e.target.value)} id="search" className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        {open && <div className="search-results-menu">{
                            results.map((res: Product, index: number) => <div onClick={() => {
                                history.push('/company/' + res.company + '/' + res.category + '/' + res._id)
                            }}>{res?.subcode || res?.code}</div>)
                        }</div>}
                    </div>
                </div>
            </div>
        </nav>  
    );
}

export default MainNav;
