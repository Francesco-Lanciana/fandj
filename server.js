const express = require("express");
const dev = process.env.NODE_ENV !== "production";
const next = require("next");
const app = next({ dev, dir: "./src" });
const handle = app.getRequestHandler();

app.prepare()
    .then(() => {
        const server = express();

        server.get("/article/:slug", (req, res) => {
            const nextJsPage = "/article";
            const queryParams = { slug: req.params.slug };
            app.render(req, res, nextJsPage, queryParams);
        });

        server.get("/", (req, res) => {
            const nextJsPage = "/articles";
            app.render(req, res, nextJsPage);
        });

        server.get("*", (req, res) => handle(req, res));

        server.listen(3000, (err) => {
            if (err) throw err;
            console.log("> Ready http://localhost:3000 <");
        });
    })
    .catch((ex) => {
        console.error(ex.stack);
        process.exit(1);
    });
