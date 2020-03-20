import React, { Component } from 'react';
import MyLiveContext from './MyLiveContext';
// import Editor from '../Editor2';
import {Controlled as Editor} from 'react-codemirror2';

if (typeof navigator !== 'undefined') {
  require('codemirror/lib/codemirror.css');
  require('codemirror/theme/material.css');
  require('codemirror/addon/edit/matchbrackets');
  require('codemirror/addon/edit/closebrackets');
  require('codemirror/addon/comment/comment');
  require('codemirror/keymap/sublime');
  require('codemirror/mode/mllike/mllike');
  require('./reason-mode.js');
}

class MyLiveEditor extends Component {
  constructor(props) {
    super(props);
    const {code} = props;
    this.state = {
      code
    };
  }

  render() {
    return (
      <MyLiveContext.Consumer>
        {({ language, disabled, executeCode, resetInterpreter }) => (
          <div
            onKeyDown={(e) => {
              if (e.shiftKey && e.ctrlKey && e.key === 'Enter') resetInterpreter()
              if (e.ctrlKey && e.key === 'Enter') executeCode(this.state.code)
            }}
          >
          <Editor
            value={this.state.code}
            options={{
              mode: (language === 'reason') ? 'reason' : 'text/x-ocaml',
              theme: 'material', // TODO switch based on the Docusaurus night/day setting?
              keyMap: 'sublime',
              lineNumbers: true,
              tabSize: 2,
              matchBrackets: true,
              autoCloseBrackets: true,
              readOnly: disabled,
              viewportMargin: Infinity
            }}
            editorDidMount={editor => {
              // editor.something
            }}
            onBeforeChange={(editor, data, code) => {
              this.setState({code});
            }}
            onChange={(editor, data, code) => {
            }}
          />
          { disabled ? null :
          <div>
            <button
              type="button"
              aria-label="Execute code"
              onClick={() => executeCode(this.state.code)}>Execute</button>
            {/* <button
              type="button"
              aria-label="Reset interpreter"
              onClick={() => {resetInterpreter(); executeCode(this.state.code)}}>Reset</button> */}
          </div>
          }
          </div>
        )}
      </MyLiveContext.Consumer>
    ); // TODO only add the button if not disabled
  }
}

export default MyLiveEditor;