const path = require("path");
const withTypescript = require("@zeit/next-typescript");
const withSass = require("@zeit/next-sass");

//import { getArticles } from "@Modules/blogApi";
const config = require('./src/config');
const Prismic = require('prismic-javascript');
const root = path.join(__dirname, "src");

module.exports = withTypescript(
    withSass({
        webpack(config, options) {
            config.resolve.alias["@Components"] = path.join(root, "components");
            config.resolve.alias["@Modules"] = path.join(root, "modules");
            config.resolve.alias["@Styles"] = path.join(root, "styles");
            config.resolve.alias["@Layouts"] = path.join(root, "layouts");
            config.resolve.alias["@Types"] = path.join(root, "types");
            config.resolve.alias["@Hooks"] = path.join(root, "hooks");

            config.output.devtoolModuleFilenameTemplate = (info) => {
                let shortenedAbsPath;

                if (info.absoluteResourcePath.includes("node_modules")) {
                    shortenedAbsPath = info.absoluteResourcePath.split(`node_modules${path.sep}`).pop();
                    return `webpack:///Node Modules/${shortenedAbsPath}`;
                }

                shortenedAbsPath = info.absoluteResourcePath.split(`src${path.sep}`).pop();

                return `webpack:///${shortenedAbsPath}`;
            };

            return config;
        },
        exportPathMap: async function(defaultPathMap) {
            const API = await Prismic.api(config.PRISMIC_API_URL);
            const predicatePath = Prismic.Predicates.at("document.type", "article");
            const response = await API.query(predicatePath);
            const articles = response.results;
            const articleRoutes = articles.reduce((routes, article) => ({
                ...routes,
                [`/article/${article.uid}`]: { page: "/article", query: { slug: article.uid } }
            }), {});

            delete defaultPathMap['/article'];
            const routes = {
                ...defaultPathMap,
                ...articleRoutes,
            }
            
            return routes;
        },
    })
);
