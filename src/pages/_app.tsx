import React from "react";
import App, { Container } from "next/app";
import Head from "next/head";
import DefaultLayout from "@Layouts/DefaultLayout/DefaultLayout";

import { DEFAULT_SEO } from "../config";

import "@Styles/main.scss";

export default class CustomApp extends App {
    static async getInitialProps({ Component, router, ctx }) {
        let pageProps = {};
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }
    
        return { pageProps };
    };
  
    render() {
      const { Component, pageProps } = this.props;
      return (
        <Container>
            <Head>
                <title key="title">{DEFAULT_SEO.title}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="google-site-verification" content="62JDm4DbcxBCsrQ1H1ntfsPsxQiJLjDuST4XbnBf8F4" />
                <meta key="description" name="description" content={DEFAULT_SEO.description} />
                <meta key="twitter:card" name="twitter:card" content={DEFAULT_SEO.twitter.cardType} />
                <meta key="twitter:site" name="twitter:site" content={DEFAULT_SEO.twitter.handle} />
                <meta key="og:url" property="og:url" content={DEFAULT_SEO.openGraph.url} />
                <meta key="og:type" property="og:type" content={DEFAULT_SEO.openGraph.type} />
                <meta key="og:title" property="og:title" content={DEFAULT_SEO.openGraph.title} />
                <meta
                    key="og:description"
                    property="og:description"
                    content={DEFAULT_SEO.openGraph.description}
                />
                <meta key="og:image" property="og:image" content={DEFAULT_SEO.openGraph.image} />
                <meta
                    key="og:image:width"
                    property="og:image:width"
                    content={DEFAULT_SEO.openGraph.imageWidth}
                />
                <meta
                    key="og:image:height"
                    property="og:image:height"
                    content={DEFAULT_SEO.openGraph.imageHeight}
                />
                <meta key="og:locale" property="og:locale" content={DEFAULT_SEO.openGraph.locale} />
            </Head>
            <DefaultLayout>
                <Component {...pageProps} />
            </DefaultLayout>
        </Container>
      );
    }
  }