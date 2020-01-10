import React from 'react';
import MyLiveContext from './MyLiveContext';
import Editor from '../Editor';

export default function MyLiveEditor(props) {
  return (
    <MyLiveContext.Consumer>
      {({ code, language, theme, disabled, onChange }) => (
        <Editor
          theme={theme}
          code={code}
          language={language}
          disabled={disabled}
          onChange={onChange}
          {...props}
        />
      )}
    </MyLiveContext.Consumer>
  );
}
