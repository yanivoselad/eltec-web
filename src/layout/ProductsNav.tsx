import { useProducts } from "../products/components";
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import _ from "lodash";

interface RouteParams {
    companyName: string
    categoryName: string
}

function ProductsNav() {
    const { categories, lang } = useProducts()
    const { categoryName } = useParams<RouteParams>();
    const [open, setOpen] = useState(false)
    const [subopen, setSubOpen] = useState<string | undefined>(undefined)
    const inputRef = useRef<HTMLElement>(null); // Reference to the input
    const onOutsideClick = () => {
        setSubOpen(undefined)
    }

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
        <nav id="products-nav" ref={inputRef} className="navbar navbar-expand-lg bg-body-tertiary products d-none d-sm-flex">
            <div className="container">              
                <div className={`navbar-collapse ${open ? 'show' : ''}`} id="navbarProducts">
                    <ul id="companies-nav" className="navbar-nav me-auto mb-2 mb-lg-0 rtl">
                        {categories && categories.map(
                            (category, index) => <li
                                key={index}
                                className={`nav-item ${category.subcategories.length > 1 ? 'dropdown' : ''}`}
                                onClick={() => {
                                    setSubOpen(subopen === 'sub' + index ? undefined :'sub' + index)
                                }}>
                            <Link
                                    className={`nav-link ${categoryName === category.name ? 'active' : ''} ${category.subcategories.length > 1 ? 'dropdown-toggle' : ''}`}
                                    to={`${category.subcategories.length > 1 ? '#' :`/category/${category.name}`}`}
                                    id="navbarDropdownMenuLink"

                                >{_.get(lang,'category.titles.'+category.name)} </Link>
                                {category.subcategories.length > 1 &&
                                    <div className={`dropdown-menu ${subopen === 'sub' + index ? 'show' : ''}`}>
                                        {category.subcategories.map(
                                            (subcategory: string, index2: number) =>
                                                subcategory !== "_" && <Link
                                                    key={index2 + 100}
                                                    className={`dropdown-item`}
                                                    to={`/category/${category.name}/sub/${subcategory}`}
                                                    onClick={() => {
                                                        setOpen(!open)
                                                    }}

                                                >{_.get(lang, 'subcategory.titles.' + subcategory, subcategory)}</Link>
                                        )}
                                    </div>}
                        </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default ProductsNav;
