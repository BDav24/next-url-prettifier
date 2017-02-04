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
  route?: RouteLinkParamsType
} & NextLinkPropsType;

/* Component */
export default class PrettyLink extends React.Component {
  props: PropsType;

  render(): React.Element<*> {
    return <Link {...this.props} {...this.props.route} />;
  }
}
