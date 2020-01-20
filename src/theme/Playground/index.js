/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import _uniqueId from 'lodash/uniqueId';
import MyLiveProvider from '../../components/Live/MyLiveProvider'
import MyLiveEditor from '../../components/Live/MyLiveEditor'
import MyLivePreview from '../../components/Live/MyLivePreview'
import MyLiveError from '../../components/Live/MyLiveError'

import classnames from 'classnames';

import styles from './styles.module.css';

function Playground({children, theme, language, canvas, hidden, ...props}) {
  const [canvasId] = React.useState(_uniqueId('canvas-'));
  let graphics = (canvas)
    ? <canvas id={canvasId} width="600" height="400" className={styles.playgroundCanvas}/>
    : <></>;

  if (hidden) {
    return (<MyLiveProvider
      code={children}
      language={language}
      theme={theme}
      canvas={(canvas) ? canvasId : ''}
      {...props}>
      {graphics}
    </MyLiveProvider>);
  } else {
      return (
      <MyLiveProvider
        code={children}
        language={language}
        theme={theme}
        canvas={(canvas) ? canvasId : ''}
        {...props}>
        <div
          className={classnames(
            styles.playgroundHeader,
            styles.playgroundEditorHeader,
          )}>
          Live Editor
        </div>
        <MyLiveEditor />
        <div
          className={classnames(
            styles.playgroundHeader,
            styles.playgroundPreviewHeader,
          )}>
          {language} Output
        </div>
        <div className={styles.playgroundPreview}>
          <MyLivePreview />
          <MyLiveError />
        </div>
        {graphics}
      </MyLiveProvider>
    );
  }
}

export default Playground;
