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

import styles from './styles.module.css';

function LiveCodeBlock({code, language, edit, noexec, hidden, ...props}) {
  // if (edit) {
  //   // create an editor around the highlighted code, and an execute button
  // }

  // if (noexec) {
  //   // don't evaluate initial code on page load
  // }

  // if (hidden) {
  //   // only show output (if any)
  // }

  return (<MyLiveProvider
    code={code}
    language={language}
    hidden={hidden}
    noexec={noexec}
    disabled={!edit}
    {...props}>
    {(hidden) ? null : <MyLiveEditor code={code} />}
    <div className={styles.playgroundPreview}>
      <MyLivePreview Component="div"/>
    </div>
  </MyLiveProvider>);
}

export default LiveCodeBlock;
