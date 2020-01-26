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
        {({ code, language, theme, disabled, executeCode }) => (
          <div>
          <Editor
            theme={theme}
            code={code}
            language={language}
            disabled={disabled}
            onChange={this.updateContent.bind(this)}
            {...this.props}
          />
          <button
            type="button"
            aria-label="Execute code"
            onClick={() => executeCode(this.state.code)}>Execute</button>
          </div>
        )}
      </MyLiveContext.Consumer>
    ); // TODO only add the button if not disabled
  }
}

export default MyLiveEditor;