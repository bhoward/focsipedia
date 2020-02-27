import React, { Component } from 'react';

import MyLiveContext from './MyLiveContext';
import { generateElement } from '../../utils/transpile';

export default class MyLiveProvider extends Component {
  // eslint-disable-next-line camelcase
  componentDidMount() {
    const { code, language, noexec } = this.props;

    if (!noexec) {
      this.transpile({ code, language });
    }
  }

  componentDidUpdate({
    code: prevCode,
    language: prevLanguage
  }) {
    // console.log("did update");
    const { code, language } = this.props;
    if (
      code !== prevCode ||
      language !== prevLanguage
    ) {
      // this.transpile({ code, language });
    }
  }

  onChange(code) {
    const { language } = this.props;
    this.transpile({ code, language });
  }

  executeCode(code) {
    const { language } = this.props;
    this.transpile({ code, language });
  }

  resetInterpreter() {
    evaluator.reset();
  }

  onError(error) {
    this.setState({ error: error.toString() });
  }

  transpile({ code, language }) {
    // Transpilation arguments
    const input = {
      code,
      language
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
    const { children, code, language, theme, disabled } = this.props;

    return (
      <MyLiveContext.Provider
        value={{
          ...this.state,
          code,
          language,
          theme,
          disabled,
          onError: this.onError.bind(this),
          onChange: this.onChange.bind(this),
          executeCode: this.executeCode.bind(this),
          resetInterpreter: this.resetInterpreter.bind(this)
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

