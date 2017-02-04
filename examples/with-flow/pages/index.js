/* @flow */
import React from 'react';

export default function IndexPage(): React.Element<*> {
  return (
    <div>
      <h1>Homepage</h1>
      <form method="GET" action="/greeting">
        Name: <input name="name" />
        <input type="submit" />
      </form>
    </div>
  );
}
