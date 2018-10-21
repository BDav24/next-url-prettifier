/* @flow */
import defaultParamsToQueryString from './utils/paramsToQueryString';
import Link from './link';
// Types
import type {RouteLinkParamsType} from './link';

/* Types */
export type ParamType = any;
export type PatternType = string;
export type PrettyPatternType = {pattern: PatternType, defaultParams?: ParamType};

export type RouteType<PageNameType: string> = {
  page: PageNameType,
  prettyUrl?: string | (params: ParamType) => string,
  prettyPatterns?: PatternType | (PatternType | PrettyPatternType)[],
  prettyUrlPatterns?: PatternType | (PatternType | PrettyPatternType)[]
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

  getPrettyUrl(pageName: T, params: ParamType): RouteLinkParamsType {
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

  linkPage(pageName: T, params: ParamType): RouteLinkParamsType {
    // eslint-disable-next-line no-console
    console.warn("linkPage() is deprecated. Use getPrettyUrl() instead.");
    return this.getPrettyUrl(pageName, params);
  }

  getPrettyUrlPatterns(route: RouteType<T>): PrettyPatternType[] {
    return typeof route.prettyUrlPatterns === 'string'
      ? [{pattern: route.prettyUrlPatterns}]
      : Array.isArray(route.prettyUrlPatterns)
        ? route.prettyUrlPatterns.map(
          (pattern: PatternType | PrettyPatternType): PrettyPatternType =>
            (typeof pattern === 'string' ? {pattern} : pattern)
        )
        : typeof route.prettyUrl === 'string'
          ? [{pattern: route.prettyUrl}]
          : []
      ;
  }

  getPrettyPatterns(route: RouteType<T>): PrettyPatternType[] {
    return typeof route.prettyPatterns === 'string'
      ? [{pattern: route.prettyPatterns}]
      : Array.isArray(route.prettyPatterns)
        ? route.prettyPatterns.map(
          (pattern: PatternType | PrettyPatternType): PrettyPatternType =>
            (typeof pattern === 'string' ? {pattern} : pattern)
        )
        : typeof route.prettyUrl === 'string'
          ? [{pattern: route.prettyUrl}]
          : []
    ;
  }

  forEachPrettyPattern(apply: PatternFunctionType<T>): void {
    this.routes.forEach((route: RouteType<T>): void => {
      this.getPrettyUrlPatterns(route).forEach((pattern: PrettyPatternType): any =>
        apply(route.page, pattern.pattern, pattern.defaultParams)
      );
      this.getPrettyPatterns(route).forEach((pattern: PrettyPatternType): any =>
        apply(route.page, pattern.pattern, pattern.defaultParams)
      );
    });
  }

  forEachPattern(apply: PatternFunctionType<T>): void {
    // eslint-disable-next-line no-console
    console.warn("forEachPattern() is deprecated. Use forEachPrettyPattern() instead.");
    this.forEachPrettyPattern(apply);
  }
}

export {Link as Link};
