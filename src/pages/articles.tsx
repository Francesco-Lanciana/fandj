import React from "react";
import Link from "next/link";
import { NextFC } from "next";
import { getArticles } from "@Modules/blogApi";
import { linkResolver } from "@Modules/blogHelpers";
import { Document } from "@Types/prismic-javascript";

import './articles.scss';

interface ArticlesPageProps {
    posts: Document[];
}

const ArticlesPage: NextFC<ArticlesPageProps> = ({ posts }) => (
    <>
        <div className="articles-page">
            
            <h1 className="page-title">Articles</h1>

            <main className="articles">
                <ul className="articles-list">
                    {posts.map((post, index) => (
                        <li key={index}>
                            <Link as={linkResolver(post)} href={`/article?slug=${post.uid}`} passHref>
                                <a className="article-title">
                                    <h2>{post.data.title[0].text}</h2>
                                </a>
                            </Link>
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    </>
);

ArticlesPage.getInitialProps = async () => {
    // Here we call the API and request 5 documents
    const [, res] = await getArticles({ pageSize: 5 });

    return {
        posts: res.results,
    };
};

export default ArticlesPage;
