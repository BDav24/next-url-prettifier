/* @flow */
import React from 'react';
import {Link} from 'next-url-prettifier';
import {Router} from '../routes';

type PropsType = {
  lang: ?('en' | 'fr'),
  name: ?string
};

export default class GreetingPage extends React.Component<PropsType> {
  props: PropsType;

  static getInitialProps({query: {lang, name}}: {query: PropsType}): PropsType {
    return {lang, name};
  }

  renderSwitchLangageLink() {
    const {lang, name}: PropsType = this.props;
    const switchLang: string = lang === 'fr' ? 'en' : 'fr';
    return (
      <Link route={Router.getPrettyUrl('greeting', {name, lang: switchLang})}>
        <a>{switchLang === 'fr' ? 'Français' : 'English'}</a>
      </Link>
    );
  }

  render() {
    const {lang, name}: PropsType = this.props;
    return (
      <div>
        <h1>{lang === 'fr' ? 'Bonjour' : 'Hello'} {name}</h1>
        <div>{this.renderSwitchLangageLink()}</div>
      </div>
    );
  }
}
