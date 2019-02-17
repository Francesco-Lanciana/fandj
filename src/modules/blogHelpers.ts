import { Document } from "@Types/prismic-javascript";

function linkResolver(doc: Document) {
    switch(doc.type) {
        case "article":
            return `/article/${doc.uid}`;
        default:
            return "/";
    }
}

export { linkResolver };