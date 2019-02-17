import React from "react";
import { NextFC } from 'next';
import DefaultLayout from "@Layouts/DefaultLayout/DefaultLayout";

const ArticlePage: NextFC<{}> = () => (
    <DefaultLayout>
        <header>
            <h1>A little bit about us</h1>
        </header>
    </DefaultLayout>
);

export default ArticlePage;
