/**
 * A navigation component that dissapears while the user is read an article (i.e. is 
 * scrolling down the page)
 * Related issues: https://github.com/zeit/next.js/issues/796
 */

import React from "react";
import Link from 'next/link'

import { useScrollBasedPin } from "@Hooks/window-hooks.ts";

import "./NavBar.scss";

const NavBar: React.FC<{}> = () => {
    const isPinned = useScrollBasedPin(true, { pinThreshold: 50 });

    return (
        <header className="navbar f-f-montserrat" data-show={isPinned}>
            <div className="navbar-content">
                <div className="logo-container">Mosaic</div>
                <nav className="site-navigation-container">
                    <ul className="site-navigation-links">
                        <li className="site-navigation-link"><Link prefetch href="/articles"><a>Articles</a></Link></li>
                        <li className="site-navigation-link"><Link prefetch href="/experiments"><a>Experiments</a></Link></li>
                        <li className="site-navigation-link"><Link prefetch href="/about"><a>Who we are</a></Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default NavBar;
