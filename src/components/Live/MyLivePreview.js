import React from 'react';
import MyLiveContext from './MyLiveContext';

function MyLivePreview({ Component, ...rest }) {
  return (
    <Component {...rest}>
      <MyLiveContext.Consumer>
        {({ element: Element }) => Element && <Element />}
      </MyLiveContext.Consumer>
    </Component>
  );
}

MyLivePreview.defaultProps = {
  Component: 'div'
};

export default MyLivePreview;
