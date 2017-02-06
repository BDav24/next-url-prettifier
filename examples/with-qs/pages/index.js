import React from 'react';
import {Link} from 'next-url-prettifier';
import {Router} from '../routes';

export default function IndexPage() {
  const linkParams = {
    a: 1,
    b: [2, 3],
    c: {d: [4, 5]}
  };
  return (
    <div>
      <h1>Homepage</h1>
      <Link route={Router.linkPage('index', linkParams)}>
        <a>Link with complex params</a>
      </Link>
    </div>
  );
}
