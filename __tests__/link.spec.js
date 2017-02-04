/* @flow */
import React from 'react';
import {shallow, ShallowWrapper} from 'enzyme';
import NextLink from 'next/link';
// Local
import PrettyLink from 'next-url-prettifier/link';
// Types
import type {PropsType, RouteLinkParamsType} from 'next-url-prettifier/link';

describe('PrettyLink', (): void => {
  it('should behave like next/link if route is not specified', (): void => {
    const props: PropsType = {
      href: 'http://example.com'
    };
    const a: React.Element<*> = <a>label</a>;
    expect(shallow(<PrettyLink {...props}>{a}</PrettyLink>).html())
      .toBe(shallow(<NextLink {...props}>{a}</NextLink>).html());
  });

  it('should add href and as if route is specified', (): void => {
    const a: React.Element<*> = <a>label</a>;
    const routeParams: RouteLinkParamsType = {
      href: '/pageName?id=1',
      as: '/page-pretty-url-1'
    };
    const link: ShallowWrapper
      = shallow(<PrettyLink route={routeParams}>{a}</PrettyLink>);
    const nextLink: ShallowWrapper
      = shallow(<NextLink href="/pageName?id=1" as="/page-pretty-url-1">{a}</NextLink>);

    expect(link.name()).toBe('Link');
    expect(link.prop('href')).toBe('/pageName?id=1');
    expect(link.prop('as')).toBe('/page-pretty-url-1');
    expect(link.html()).toBe(nextLink.html());
  });
});
