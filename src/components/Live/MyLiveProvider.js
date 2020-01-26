import React, { Component } from 'react';

import MyLiveContext from './MyLiveContext';
import { generateElement } from '../../utils/transpile';

export default class MyLiveProvider extends Component {
  // eslint-disable-next-line camelcase
  componentDidMount() {
    const { code, language, noexec, canvas } = this.props;

    if (!noexec) {
      this.transpile({ code, language, canvas });
    }
  }

  componentDidUpdate({
    code: prevCode,
    language: prevLanguage,
    canvas: prevCanvas
  }) {
    // console.log("did update");
    const { code, language, canvas } = this.props;
    if (
      code !== prevCode ||
      language !== prevLanguage ||
      canvas !== prevCanvas
    ) {
      // this.transpile({ code, language, canvas });
    }
  }

  onChange(code) {
    const { language, canvas } = this.props;
    this.transpile({ code, language, canvas });
  }

  executeCode(code) {
    const { language, canvas } = this.props;
    this.transpile({ code, language, canvas });
  }

  onError(error) {
    this.setState({ error: error.toString() });
  }

  transpile({ code, language, canvas }) {
    // Transpilation arguments
    const input = {
      code,
      language,
      canvas
    };

    const errorCallback = err =>
      this.setState({ element: undefined, error: err.toString() });
    const renderElement = element =>
      this.setState({ ...state, element });

    // State reset object
    const state = { unsafeWrapperError: undefined, error: undefined };

    try {
      generateElement(input, renderElement, errorCallback);
    } catch (error) {
      this.setState({ ...state, error: error.toString() });
    }
  }

  render() {
    const { children, code, language, theme, canvas, disabled } = this.props;

    return (
      <MyLiveContext.Provider
        value={{
          ...this.state,
          code,
          language,
          theme,
          canvas,
          disabled,
          onError: this.onError.bind(this),
          onChange: this.onChange.bind(this),
          executeCode: this.executeCode.bind(this)
        }}
      >
        {children}
      </MyLiveContext.Provider>
    );
  }
}

MyLiveProvider.defaultProps = {
  code: '',
  language: 'reason',
  disabled: false
};

