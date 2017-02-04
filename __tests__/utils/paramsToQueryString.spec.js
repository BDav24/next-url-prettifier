/* @flow */
import paramsToQueryString from 'next-url-prettifier/utils/paramsToQueryString';

describe('paramsToQueryString', (): void => {
  it('returns ordered query string', (): void => {
    expect(paramsToQueryString({
      foo: 'bar',
      bar: 0,
      baz: 1
    })).toBe('?bar=0&baz=1&foo=bar');
  });

  it('should not display null, undefined params or unknow types in query string', (): void => {
    expect(paramsToQueryString({
      nullValues: null,
      undefinedValues: undefined
    })).toBe('');
    expect(paramsToQueryString({
      nullValues: null,
      undefinedValues: undefined,
      foo: 'bar',
      bar: ['one', {two: 2}]
    })).toBe('?bar[]=one&foo=bar');
  });

  it('should represent arrays with brackets', (): void => {
    expect(paramsToQueryString({
      bar: ['one', 'two', ['three']]
    })).toBe('?bar[]=one&bar[]=two&bar[][]=three');
  });

  it('should not display empty arrays in query string', (): void => {
    expect(paramsToQueryString({
      foo: 'bar',
      empty: []
    })).toBe('?foo=bar');
  });

  it('returns an empty string if params is not an object', (): void => {
    expect(paramsToQueryString()).toBe('');
    expect(paramsToQueryString(0)).toBe('');
    expect(paramsToQueryString('')).toBe('');
    expect(paramsToQueryString([])).toBe('');
  });
});
