# Url prettifier for Next Framework

[![npm version](https://d25lcipzij17d.cloudfront.net/badge.svg?id=js&type=6&v=1.1.6&x2=0)](https://www.npmjs.com/package/next-url-prettifier)

Easy to use url prettifier for [next.js](https://github.com/zeit/next.js).

## Why you should use it
- Good integration with Next.js (only adds "href" and "as" props to existing Link)
- On server-side, use the parameter matching you want (Express.js or else)
- Handles reverse routing
- It's flow typed and well tested
- It's extendable (you can use the query stringfier you want)
- No dependencies

## How to use

#### Install:
```bash
npm i --save next-url-prettifier
```

#### Create `routes.js` inside your project root:
```javascript
// routes.js
const UrlPrettifier = require('next-url-prettifier').default;

const routes = [
  {
    page: 'index',
    prettyUrl: '/home'
  },
  {
    page: 'greeting',
    // `prettyUrl` is used on client side to construct the URL of your link
    prettyUrl: ({lang = '', name = ''}) =>
      (lang === 'fr' ? `/bonjour/${name}` : `/hello/${name}`),
    // `prettyPatterns` is used on server side to find which component/page to display
    prettyPatterns: [
      {pattern: '/hello/:name', defaultParams: {lang: 'en'}},
      {pattern: '/bonjour/:name', defaultParams: {lang: 'fr'}}
    ]
  }
];

const urlPrettifier = new UrlPrettifier(routes);
exports.default = routes;
exports.Router = urlPrettifier;
```

#### In your components:
```javascript
// pages/greeting.js
import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'next-url-prettifier';
import {Router} from '../routes';

export default class GreetingPage extends React.Component {
  static getInitialProps({query: {lang, name}}) {
    return {lang, name};
  }

  renderSwitchLangageLink() {
    const {lang, name} = this.props;
    const switchLang = lang === 'fr' ? 'en' : 'fr';
    return (
      <Link route={Router.getPrettyUrl('greeting', {name, lang: switchLang})}>
        <a>{switchLang === 'fr' ? 'Français' : 'English'}</a>
      </Link>
    );
    /*
    Note: you can also use Next native Link and spread notation:
    import Link from 'next/link';
    return (
      <Link {...Router.getPrettyUrl('greeting', {name, lang: switchLang})}>
        <a>{switchLang === 'fr' ? 'Français' : 'English'}</a>
      </Link>
    );
    */
  }

  render() {
    const {lang, name} = this.props;
    return (
      <div>
        <h1>{lang === 'fr' ? 'Bonjour' : 'Hello'} {name}</h1>
        <div>{this.renderSwitchLangageLink()}</div>
      </div>
    );
  }
}

GreetingPage.propTypes = {
  lang: PropTypes.string,
  name: PropTypes.string
};
```

#### In your `server.js` file (example with Express.js):
```javascript
// server.js
const express = require('express');
const next = require('next');
const Router = require('./routes').Router;

const dev = process.env.NODE_ENV !== 'production';
const port = parseInt(process.env.PORT, 10) || 3000;
const app = next({dev});
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();

    Router.forEachPrettyPattern((page, pattern, defaultParams) => server.get(pattern, (req, res) =>
      app.render(req, res, `/${page}`, Object.assign({}, defaultParams, req.query, req.params))
    ));

    server.get('*', (req, res) => handle(req, res));
    server.listen(port);
  })
;
```

## Examples:
- [Basic with Express](./examples/basic-with-express)
- [With Flowtype](./examples/with-flow)
- [With qs as query stringifier](./examples/with-qs)
