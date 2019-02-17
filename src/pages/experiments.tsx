import React from "react";
import Link from "next/link";
import { NextFC } from "next";
import DefaultLayout from "@Layouts/DefaultLayout/DefaultLayout";
import { getArticles } from "@Modules/blogApi";
import { linkResolver } from "@Modules/blogHelpers";
import { Document } from "@Types/prismic-javascript";

interface ExperimentPageProps {
    posts: Document[];
}

const Experiments: NextFC<ExperimentPageProps> = ({ posts }) => (
    <DefaultLayout>
        <h1>Experiments</h1>

        <div className="experiment">
            <h2>Our experiments</h2>
        </div>
    </DefaultLayout>
);

Experiments.getInitialProps = async (a) => {
    // Here we call the API and request 5 documents
    const [, res] = await getArticles({ pageSize: 5 });

    return {
        posts: res.results,
    };
};

export default Experiments;
