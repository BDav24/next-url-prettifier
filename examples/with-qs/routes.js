const UrlPrettifier = require('next-url-prettifier').default;
const qs = require('qs');

const routes = [];

const urlPrettifier = new UrlPrettifier(routes, {
  paramsToQueryString: (params) => `?${qs.stringify(params)}`
});
exports.default = routes;
exports.Router = urlPrettifier;
