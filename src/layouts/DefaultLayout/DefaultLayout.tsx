import React from "react";
import NavBar from "@Components/NavBar/NavBar";

import './DefaultLayout.scss';

const DefaultLayout: React.FC<{}> = ({ children }) => (
    <div className="default-layout">
        <NavBar />
        <main className="content-container">{children}</main>
    </div>
);

export default DefaultLayout;
