/**
 * A navigation component that dissapears while the user is read an article (i.e. is
 * scrolling down the page)
 * Related issues: https://github.com/zeit/next.js/issues/796
 */

import React from "react";
import Link from "next/link";
import { withRouter, SingletonRouter } from "next/router";

import { useScrollBasedPin } from "@Hooks/window-hooks.ts";

import "./NavBar.scss";

interface NavBarProps {
    router: SingletonRouter;
}

const NavBar: React.FC<NavBarProps> = ({ router }) => {
    const isPinned = useScrollBasedPin(true, { pinThreshold: 50 });
    const { pathname } = router;

    return (
        <header className="navbar f-f-montserrat" data-show={isPinned}>
            <div className="navbar-content">
                <div className="logo-container">F&amp;J</div>
                <nav className="site-navigation-container">
                    <ul className="site-navigation-links">
                        <li className="site-navigation-link">
                            <Link prefetch href="/articles">
                                <a data-active={pathname.includes("/articles")}>Articles</a>
                            </Link>
                        </li>
                        <li className="site-navigation-link">
                            <Link prefetch href="/experiments">
                                <a data-active={pathname.includes("/experiments")}>Experiments</a>
                            </Link>
                        </li>
                        <li className="site-navigation-link">
                            <Link prefetch href="/about">
                                <a data-active={pathname.includes("/about")}>About</a>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default withRouter(NavBar);
