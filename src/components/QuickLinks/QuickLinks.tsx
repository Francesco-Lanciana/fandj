/**
 * A side navigation component that displays a list of links to content
 * relevant to the main content on the page.
 */

import React from "react";

import "./QuickLinks.scss";

const QuickLinks: React.FC<{}> = ({ children }) => {

    const wrappedQuickLinks = React.Children.map(children, (quickLink, i) => <li key={i}>{quickLink}</li>);

    return (
        <aside className="quick-links">
            <ul>
                {wrappedQuickLinks}
            </ul>
        </aside>
    );
};

export default QuickLinks;
