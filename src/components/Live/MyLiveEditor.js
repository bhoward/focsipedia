import React, { Component } from 'react';
import MyLiveContext from './MyLiveContext';
import Editor from '../Editor';

class MyLiveEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { // Yes this is terrible...
      code: ''
    };
  }

  updateContent(code) {
    this.setState({ code }); // ignores outer onChange...
  }

  render() {
    return (
      <MyLiveContext.Consumer>
        {({ code, language, theme, disabled, executeCode, resetInterpreter }) => (
          <div
            onKeyDown={(e) => {
              if (e.shiftKey && e.ctrlKey && e.key === 'Enter') resetInterpreter()
              if (e.ctrlKey && e.key === 'Enter') executeCode(this.state.code)
            }}
          >
          <Editor
            theme={theme}
            code={code}
            language={language}
            disabled={disabled}
            onChange={this.updateContent.bind(this)}
            {...this.props}
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