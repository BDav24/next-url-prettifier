/* @flow */
import UrlPrettifier from 'next-url-prettifier/index';
// Types
import type {RouteType, PrettyPatternType} from 'next-url-prettifier/index';

const patternString: string = '/page-pretty-url-:id';
const prettyPatterns: (PrettyPatternType | string)[] = [
  {pattern: patternString},
  {pattern: '/page-pretty-url-one', defaultParams: {id: 1}}
];
// prettyUrlPatterns is Deprecated
const prettyUrlPatterns: (PrettyPatternType | string)[] = [
  {pattern: patternString},
  {pattern: '/page-pretty-url-one', defaultParams: {id: 1}}
];
const route: RouteType<*> = {
  page: 'pageName',
  prettyUrl: ({id}: {id: number}): string => `/page-pretty-url-${id}`,
  prettyPatterns
};
const router: UrlPrettifier<*> = new UrlPrettifier([route]);

describe('UrlPrettifier options', (): void => {
  it('should use paramsToQueryString if given', (): void => {
    const routerWithCustomQs: UrlPrettifier<*> = new UrlPrettifier([route], {
      paramsToQueryString: ({id}: {id: number}): string => `/id/${id}`
    });
    expect(routerWithCustomQs.linkPage('pageName', {id: 1}))
      .toEqual({href: '/pageName/id/1', as: '/page-pretty-url-1'});
    expect(routerWithCustomQs.getPrettyUrl('pageName', {id: 1}))
      .toEqual({href: '/pageName/id/1', as: '/page-pretty-url-1'});
  });
});

describe('UrlPrettifier getPrettyUrl', (): void => {
  it('should return href and as for the route if prettyUrl is a function', (): void => {
    expect(router.getPrettyUrl('pageName', {id: 1}))
      .toEqual({href: '/pageName?id=1', as: '/page-pretty-url-1'});
  });

  it('should return href and as for the route if prettyUrl is a string', (): void => {
    const routerWithString: UrlPrettifier<*> = new UrlPrettifier([
      {...route, prettyUrl: '/page-pretty-url-1'}
    ]);
    expect(routerWithString.getPrettyUrl('pageName', {id: 1}))
      .toEqual({href: '/pageName?id=1', as: '/page-pretty-url-1'});
  });

  it('should return only href if the route does not exist', (): void => {
    expect(router.getPrettyUrl('unknownPage', {id: 1}))
      .toEqual({href: '/unknownPage?id=1'});
  });
});

describe('UrlPrettifier getPrettyUrlPatterns (DEPRECATED)', (): void => {
  it('should return an empty list if prettyUrlPattern type is not allowed (DEPRECATED)', (): void => {
    // $FlowIgnore
    expect(router.getPrettyUrlPatterns({...route, prettyUrlPatterns: {patternString}}))
      .toEqual([]);
  });

  it('should return prettyUrl if its type is string and prettyUrlPattern is undefined (DEPRECATED)', (): void => {
    // eslint-disable-next-line no-unused-vars
    const {prettyUrlPatterns, ...routeWithoutPatterns}: RouteType<*> = route;
    expect(router.getPrettyUrlPatterns({...routeWithoutPatterns, prettyUrl: '/page-pretty-url-1'}))
      .toEqual([{pattern: '/page-pretty-url-1'}]);
  });

  it('should return a PrettyPatternType if prettyUrlPattern is a string (DEPRECATED)', (): void => {
    expect(router.getPrettyUrlPatterns({...route, prettyUrlPatterns: patternString}))
      .toEqual([{pattern: patternString}]);
  });

  it('should return a PrettyPatternType if prettyUrlPattern is an array of string (DEPRECATED)', (): void => {
    expect(router.getPrettyUrlPatterns({...route, prettyUrlPatterns: [patternString]}))
      .toEqual([{pattern: patternString}]);
  });

  it('should return a PrettyPatternType if prettyUrlPattern is rightly typed (DEPRECATED)', (): void => {
    expect(router.getPrettyUrlPatterns({...route, prettyUrlPatterns}))
      .toEqual(prettyUrlPatterns);
  });
});

describe('UrlPrettifier getPrettyPatterns', (): void => {
  it('should return an empty list if prettyPattern type is not allowed', (): void => {
    // $FlowIgnore
    expect(router.getPrettyPatterns({...route, prettyPatterns: {patternString}}))
      .toEqual([]);
  });

  it('should return prettyUrl if its type is string and prettyPattern is undefined', (): void => {
    // eslint-disable-next-line no-unused-vars
    const {prettyPatterns, ...routeWithoutPatterns}: RouteType<*> = route;
    expect(router.getPrettyPatterns({...routeWithoutPatterns, prettyUrl: '/page-pretty-url-1'}))
      .toEqual([{pattern: '/page-pretty-url-1'}]);
  });

  it('should return a PrettyPatternType if prettyPattern is a string', (): void => {
    expect(router.getPrettyPatterns({...route, prettyPatterns: patternString}))
      .toEqual([{pattern: patternString}]);
  });

  it('should return a PrettyPatternType if prettyPattern is an array of string', (): void => {
    expect(router.getPrettyPatterns({...route, prettyPatterns: [patternString]}))
      .toEqual([{pattern: patternString}]);
  });

  it('should return a PrettyPatternType if prettyPattern is rightly typed', (): void => {
    expect(router.getPrettyPatterns({...route, prettyPatterns}))
      .toEqual(prettyPatterns);
  });
});

describe('Router forEachPattern (DEPRECATED)', (): void => {
  it('should iterate on each pattern', (): void => {
    const router = new UrlPrettifier([{
      page: 'pageName',
      prettyUrl: ({id}: {id: number}): string => `/page-pretty-url-${id}`,
      prettyUrlPatterns
    }])
    const mockFunction = jest.fn();
    router.forEachPattern(mockFunction);
    expect(mockFunction.mock.calls.length).toBe(2);
    expect(mockFunction).toHaveBeenCalledWith(route.page, patternString, undefined);
    expect(mockFunction).toHaveBeenCalledWith(route.page, '/page-pretty-url-one', {id: 1});
  });
});

describe('Router forEachPrettyPattern', (): void => {
  it('should iterate on each pattern', (): void => {
    const mockFunction = jest.fn();
    router.forEachPrettyPattern(mockFunction);
    expect(mockFunction.mock.calls.length).toBe(2);
    expect(mockFunction).toHaveBeenCalledWith(route.page, patternString, undefined);
    expect(mockFunction).toHaveBeenCalledWith(route.page, '/page-pretty-url-one', {id: 1});
  });
});
