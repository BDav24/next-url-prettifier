/* @flow */
import React from 'react';
import {configure, shallow, ShallowWrapper} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import NextLink from 'next/link';
// Local
import PrettyLink from 'next-url-prettifier/link';
// Types
import type {RouteLinkParamsType} from 'next-url-prettifier/link';

configure({adapter: new Adapter()})

describe('PrettyLink', (): void => {
  it('should behave like next/link if route is not specified', (): void => {
    const a = <a>label</a>;
    expect(shallow(<PrettyLink href="http://example.com">{a}</PrettyLink>).html())
      .toBe(shallow(<NextLink href="http://example.com">{a}</NextLink>).html());
  });

  it('should add href and as if route is specified', (): void => {
    const a = <a>label</a>;
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

  it('should only render children if no href is provided', (): void => {
    const a = <a>label</a>;
    expect(shallow(<PrettyLink>{a}</PrettyLink>).html())
      .toEqual(shallow(a).html());
  });
});
