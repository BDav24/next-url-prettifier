/* @flow */
import React from 'react';
import Link from 'next/link';

/* Types */
export type RouteLinkParamsType = {
  href?: string,
  as?: string
};

type NextLinkPropsType = Object; // Next is not typed

export type PropsType = {
  children?: any,
  route?: RouteLinkParamsType
} & NextLinkPropsType;

/* Component */
export default class PrettyLink extends React.Component<PropsType> {
  props: PropsType;

  render() {
    const {href, route, children, ...rest}: PropsType = this.props;
    return href || (route && route.href)
      ? <Link {...{...rest, href, children}} {...route} />
      : children
    ;
  }
}
