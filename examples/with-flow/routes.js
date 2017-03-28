/* @flow */
import UrlPrettifier from 'next-url-prettifier';
import type {RouteType} from 'next-url-prettifier';

export type PageNameType = 'index' | 'greeting';

const routes: RouteType<PageNameType>[] = [
  {
    page: 'greeting',
    prettyUrl: ({lang = '', name = ''}: {lang: string, name: string}): string =>
      (lang === 'fr' ? `/bonjour/${name}` : `/hello/${name}`),
    prettyUrlPatterns: [
      {pattern: '/hello/:name', defaultParams: {lang: 'en'}},
      {pattern: '/bonjour/:name', defaultParams: {lang: 'fr'}}
    ]
  }
];

const urlPrettifier: UrlPrettifier<PageNameType> = new UrlPrettifier(routes);
export default routes;
export {urlPrettifier as Router};
export type {RouteType};
