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

function LiveCodeBlock({children, theme, language, edit, canvas, noexec, hidden, ...props}) {
  const [canvasId] = React.useState(_uniqueId('canvas-'));
  let graphics = (canvas)
    ? <canvas id={canvasId} width="600" height="400" className={styles.playgroundCanvas}/>
    : <></>;

    if (edit) {
      // create an editor around the highlighted code, and an execute button
    }
  
    if (noexec) {
      // don't evaluate initial code on page load
    }
  
    if (hidden) {
      // only show output (if any)
    }
  
    if (hidden) {
    return (<MyLiveProvider
      code={children}
      language={language}
      theme={theme}
      noexec={false}
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
        noexec={noexec}
        canvas={(canvas) ? canvasId : ''}
        {...props}>
        {(true)
        ? <>
            <div
              className={classnames(
                styles.playgroundHeader,
                styles.playgroundEditorHeader,
              )}>
              {language} Editor
            </div>
            <MyLiveEditor />
          </> // TODO add an exec button
        : <>
          </> // TODO if not edit, just display highlighted code here
        }
        <div
          className={classnames(
            styles.playgroundHeader,
            styles.playgroundPreviewHeader,
          )}>
          Output
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

export default LiveCodeBlock;
