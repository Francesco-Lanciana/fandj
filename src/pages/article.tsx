/**
 * An individual blog post article that contains Open Graph (OG) tags and structured
 * data. The OG tags allow the webpage to become a rich object in a social graph, while
 * the structured data enriches the post for search engines.
 * 
 * Resources: https://blog.haroen.me/json-ld-with-react#comment-3255424415
 *            https://schema.org/Blog
 */

import React from "react";
import { NextFC, NextContext } from "next";
import Head from "next/head";
import { RichText } from 'prismic-reactjs';

import DefaultLayout from "@Layouts/DefaultLayout/DefaultLayout";
import QuickLinks from "@Components/QuickLinks/QuickLinks";
import { getArticlesByUid } from "@Modules/blogApi";
import { linkResolver } from "@Modules/blogHelpers";
import { Document } from "@Types/prismic-javascript";

import "./article.scss";

interface IndexPageProps {
    post: Document;
}

interface ArticleMetaData {
    title: string,
    description: string,
    url: string,
    imageUrl: string,
    datePublished: string,
    dateModified: string,
}

const ArticlePage: NextFC<IndexPageProps> = ({ post }) => {
    const { title, body, og_title, og_description, og_image } = post.data;
    const articleSeoMetaData: ArticleMetaData = {
        title: og_title[0].text,
        description: og_description[0].text,
        url: "", //|| `https://https://www.mosaic.blog/blog/${info.uid}`,
        imageUrl: og_image.url,
        datePublished: post.first_publication_date || "",
        dateModified: post.last_publication_date || "",
    }

    /** 
     * Return structured data in the form of JSON-LD to help enrich the blog
     * post for Google
     */
    function addJSONLD({ title, description, url, imageUrl, datePublished, dateModified}: ArticleMetaData) {
        return {
            __html: `{
                "@context": "http://schema.org",
                "@type": "BlogPosting",
                "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": "${url}"
                },
                "headline": "${title}",
                "image": [
                    "${imageUrl}"
                ],
                "datePublished": "${datePublished}",
                "dateModified": "${dateModified}",
                "author": {
                    "@type": "Organization",
                    "name": "F&J"
                },
                "publisher": {
                    "@type": "Organization",
                    "name": "F&J",
                    "logo": {
                        "@type": "ImageObject",
                        "url": "https://images.unsplash.com/photo-1508873787497-1b513a18217a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=4896&q=80"
                    }
                },
                "description": "${description}"
            }`,
        };
    }

    return (
        <DefaultLayout>
            <Head>
                <title key="title">{articleSeoMetaData.title}</title>
                <meta key="description" name="description" content={articleSeoMetaData.description} />
                <meta key="og:url" property="og:url" content={articleSeoMetaData.url} />
                <meta key="og:type" property="og:type" content="article" />
                <meta key="og:title" property="og:title" content={articleSeoMetaData.title} />
                <meta key="og:description" property="og:description" content={articleSeoMetaData.description} />
                <meta key="og:image" property="og:image" content={articleSeoMetaData.imageUrl} />
            </Head>
            <article className="article-page">
                <h1 className="article-title">{title.length ? title[0].text : ""}</h1>

                <main className="article-content">
                    {RichText.render(body, linkResolver)}
                </main>

                <div className="quick-links-container">
                    <QuickLinks>
                        <div>hey</div>
                    </QuickLinks>
                </div>
            </article>
            <script type="application/ld+json" dangerouslySetInnerHTML={addJSONLD(articleSeoMetaData)} />
        </DefaultLayout>
    );
};

ArticlePage.getInitialProps = async (context: NextContext) => {
    const { slug } = context.query;
    const [, res] = await getArticlesByUid(slug as string);

    return {
        post: res.results[0],
    };
};

export default ArticlePage;
