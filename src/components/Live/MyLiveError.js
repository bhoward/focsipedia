import React from 'react';
import MyLiveContext from './MyLiveContext';

export default function MyLiveError(props) {
  return (
    <MyLiveContext.Consumer>
      {({ error }) => (error ? <pre {...props}>{error}</pre> : null)}
    </MyLiveContext.Consumer>
  );
}
