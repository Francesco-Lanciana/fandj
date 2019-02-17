import * as Prismic from "prismic-javascript";
import { ResolvedApi, QueryOptions, ApiSearchResponse } from "@Types/prismic-javascript";
import to from "./to";

import { PRISMIC_API_URL } from "../config";

const getApi = (function(API: ResolvedApi | undefined) {
    return async function getApi(): Promise<ResolvedApi> {
        if (API) return API;
    
        API = await Prismic.api(PRISMIC_API_URL);
        return API;
    }
})(undefined);

const getPostsByType = async (type: string, params: QueryOptions) => {
    const API = await getApi()
    const predicatePath = Prismic.Predicates.at("document.type", type)

    const response = await to<ApiSearchResponse>(
        API.query(predicatePath, {
            ...params,
        })
    )

    return response;
};

const getArticlesByTag = async (tags: Array<string>, params: QueryOptions) => {
    const API = await getApi()
    const predicatePath = Prismic.Predicates.at("document.tags", tags);

    const response = await to<ApiSearchResponse>(
        API.query(predicatePath, {
            ...params,
        })
    );

    return response;
};

/**
 * Retrieve the blog post corresponding to the unique identifier
 * @param uid A unique identifier for a given article (part of our custom blog post type)
 */
const getArticlesByUid = async (uid: string) => {
    const API = await getApi()

    const predicatePath = Prismic.Predicates.at('my.article.uid', uid)
    const response = await to<ApiSearchResponse>(API.query(predicatePath, {}))

    return response;
}

const getArticles = async (params: QueryOptions) => {
    return getPostsByType("article", params);
}

export { getArticles, getArticlesByUid, getArticlesByTag };
