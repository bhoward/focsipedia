/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import MyLiveProvider from '../../components/Live/MyLiveProvider'
import MyLiveEditor from '../../components/Live/MyLiveEditor'
import MyLivePreview from '../../components/Live/MyLivePreview'
import MyLiveError from '../../components/Live/MyLiveError'

import classnames from 'classnames';

import styles from './styles.module.css';

function Playground({children, theme, language, ...props}) {
  return (
  <MyLiveProvider
    code={children}
    language={language}
    theme={theme}
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
  </MyLiveProvider>
);
}

export default Playground;
