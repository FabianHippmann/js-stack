import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import Helmet from 'react-helmet';

import App from './../shared/app';
import { APP_CONTAINER_CLASS, STATIC_PATH, WDS_PORT } from '../shared/config';
import { isProd } from '../shared/util';

const renderApp = (location, state, routerContext = {}) => {
  const appHtml = ReactDOMServer.renderToString(
    <StaticRouter location={location} context={routerContext}>
      <App />
    </StaticRouter>,
  );

  const head = Helmet.rewind();

  return `<!doctype html>
    <html>
      <head>
        ${head.title}
        ${head.meta}
        <link rel="stylesheet" href="${isProd
    ? STATIC_PATH
    : `http://localhost:${WDS_PORT}/dist`}/css/styles.css">
      </head>
      <body>
        <div class="${APP_CONTAINER_CLASS}">${appHtml}</div>
        <script src="${isProd
    ? STATIC_PATH
    : `http://localhost:${WDS_PORT}/dist`}/js/bundle.js"></script>
      </body>
    </html>`;
};

export default renderApp;
