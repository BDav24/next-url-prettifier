/* @flow */
import React from 'react';
import Link from 'next/link';

/* Types */
export type RouteLinkParamsType = {
  children?: any,
  href?: string,
  as?: string
};

type NextLinkPropsType = Object; // Next is not typed

export type PropsType = {
  route?: RouteLinkParamsType
} & NextLinkPropsType;

/* Component */
export default class PrettyLink extends React.Component {
  props: PropsType;

  render(): ?React.Element<*> {
    const {href, route, children}: PropsType = this.props;
    return href || (route && route.href) ? <Link {...this.props} {...route} /> : children;
  }
}
