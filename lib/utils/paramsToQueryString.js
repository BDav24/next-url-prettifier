'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = paramsToQueryString;
var isObject = function isObject(param) {
  return param === Object(param);
};

var paramsToStringList = function paramsToStringList(entries) {
  return entries.reduce(function (result, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    return result.concat(Array.isArray(value) ? paramsToStringList(value.map(function (arrayValue) {
      return [key + '[]', arrayValue];
    })) : [typeof value === 'string' || typeof value === 'number' ? key + '=' + value : '']);
  }, []);
};

function paramsToQueryString(params) {
  var paramsString = isObject(params) ? paramsToStringList(Object.keys(params).sort().map(function (key) {
    return [String(key), params[key]];
  })).filter(function (chunk) {
    return chunk.length > 0;
  }).join('&') : '';
  return paramsString.length > 0 ? '?' + paramsString : '';
}