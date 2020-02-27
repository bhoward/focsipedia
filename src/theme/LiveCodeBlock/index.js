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

function LiveCodeBlock({children, theme, language, edit, noexec, hidden, ...props}) {
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
      {...props}>
    </MyLiveProvider>);
  } else {
      return (
      <MyLiveProvider
        code={children}
        language={language}
        theme={theme}
        noexec={noexec}
        disabled={!edit}
        {...props}>
        <MyLiveEditor />
        <div className={styles.playgroundPreview}>
          <MyLivePreview Component="pre"/>
          <MyLiveError />
        </div>
      </MyLiveProvider>
    );
  }
}

export default LiveCodeBlock;
