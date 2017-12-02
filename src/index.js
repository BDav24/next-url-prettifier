/* @flow */
import defaultParamsToQueryString from './utils/paramsToQueryString';
import Link from './link';
// Types
import type {RouteLinkParamsType} from './link';

/* Types */
export type ParamType = any;
export type PatternType = string;
export type PrettyUrlPatternType = {pattern: PatternType, defaultParams?: ParamType};

export type RouteType<PageNameType: string> = {
  page: PageNameType,
  prettyUrl?: string | (params: ParamType) => string,
  prettyUrlPatterns?: PatternType | (PatternType | PrettyUrlPatternType)[]
};

export type PatternFunctionType<PageNameType: string> =
  (page: PageNameType, pattern: PatternType, defaultParams: ParamType) => any;

export type UrlPrettifierOptionsType = {
  paramsToQueryString?: (ParamType) => string
};

/* Component */
export default class UrlPrettifier<T: string> {
  routes: RouteType<T>[];
  paramsToQueryString: (ParamType) => string;

  constructor(routes: RouteType<T>[], options: UrlPrettifierOptionsType = {}): void {
    this.routes = routes;
    this.paramsToQueryString = options && options.paramsToQueryString
      ? options.paramsToQueryString
      : defaultParamsToQueryString
    ;
  }

  linkPage(pageName: T, params: ParamType): RouteLinkParamsType {
    const route: ?RouteType<T> = this.routes.filter((currentRoute: RouteType<T>): boolean =>
      currentRoute.page === pageName)[0];
    return {
      href: `/${pageName}${this.paramsToQueryString(params)}`,
      ...(route && route.prettyUrl
        ? {as: typeof route.prettyUrl === 'string' ? route.prettyUrl : route.prettyUrl(params)}
        : {}
      )
    };
  }

  getPrettyUrlPatterns(route: RouteType<T>): PrettyUrlPatternType[] {
    return typeof route.prettyUrlPatterns === 'string'
        ? [{pattern: route.prettyUrlPatterns}]
        : Array.isArray(route.prettyUrlPatterns)
          ? route.prettyUrlPatterns.map(
            (pattern: PatternType | PrettyUrlPatternType): PrettyUrlPatternType =>
              (typeof pattern === 'string' ? {pattern} : pattern)
          )
          : typeof route.prettyUrl === 'string'
            ? [{pattern: route.prettyUrl}]
            : []
    ;
  }

  forEachPattern(apply: PatternFunctionType<T>): void {
    this.routes.forEach((route: RouteType<T>): void => {
      this.getPrettyUrlPatterns(route).forEach((pattern: PrettyUrlPatternType): any =>
        apply(route.page, pattern.pattern, pattern.defaultParams)
      );
    });
  }
}

export {Link as Link};
