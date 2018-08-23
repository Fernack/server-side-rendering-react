import express from "express";
import cors from "cors";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter, matchPath } from "react-router-dom";
import serialize from "serialize-javascript";
import routes from "../shared/routes";
import App from "../shared/App";
import sourceMapSupport from "source-map-support";
import "isomorphic-fetch";
import responseBuilder from './responseBuilder.js';
import config from './config.json';

if (process.env.NODE_ENV === "development") {
  sourceMapSupport.install();
}

const app = express();

app.use(cors());
app.use(express.static("public"));

app.get("/api/items", (req, res) => {
  fetch(config.searchUrl + '?q=' + req.query.q + '&limit=4')
    .then(function(response) {
		    return response.json();
      })
      .then(response => res.json(responseBuilder.buildReponseItems(response)));
});

app.get("/api/items/:id", (req, res) => {

  fetch(config.itemsUrl + req.params.id)
    .then(function(responseItem) {
		    return responseItem.json();
      })
      .then(responseItemJson => {

        fetch(config.itemsUrl + req.params.id + '/description')
          .then(function(description) {
              return description.json();
            })
            .then(descriptionJson => res.json(responseBuilder.buildReponseItemDetail(responseItemJson,descriptionJson)));
      });
});

app.get("*", (req, res, next) => {
  const activeRoute = routes.find(route => matchPath(req.path, route));

  const requestInitialData = activeRoute.component.requestInitialData && activeRoute.component.requestInitialData(req);

  Promise.resolve(requestInitialData)
    .then(initialData => {
      const context = { initialData };
      const markup = renderToString(
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      );

      res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Test práctico front-end de Mercado Libre</title>
          <link rel="stylesheet" href="/css/main.css">
          <script src="/bundle.js" defer></script>
          <script>window.__initialData__ = ${serialize(initialData)}</script>
        </head>
        <body>
          <div id="root">${markup}</div>
        </body>
      </html>
      `);
    })
    .catch(next);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is listening");
});
