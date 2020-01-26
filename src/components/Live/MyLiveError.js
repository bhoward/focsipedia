import React from 'react';
import MyLiveContext from './MyLiveContext';

export default function MyLiveError(props) {
  return (
    <MyLiveContext.Consumer>
      {({ error }) => (error ? <pre {...props}>{error.toString().trim()}</pre> : null)}
    </MyLiveContext.Consumer>
  );
}
