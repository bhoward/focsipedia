import React, { Component } from 'react';

import MyLiveContext from './MyLiveContext';
import { generateElement } from '../../utils/transpile';

export default class MyLiveProvider extends Component {
  // eslint-disable-next-line camelcase
  componentDidMount() {
    const { code, language, noexec, hidden } = this.props;

    if (!noexec) {
      this.transpile({ code, language, hidden });
    }
  }

  onChange(code) {
    const { language, hidden } = this.props;
    this.transpile({ code, language, hidden });
  }

  executeCode(code) {
    const { language, hidden } = this.props;
    this.transpile({ code, language, hidden });
  }

  resetInterpreter() {
    evaluator.resetLocal();
  }

  onError(error) {
    this.setState({ error: error.toString() });
  }

  transpile({ code, language, hidden }) {
    // Transpilation arguments
    const input = {
      code,
      language,
      hidden
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
    const { children, code, language, hidden, disabled } = this.props;

    return (
      <MyLiveContext.Provider
        value={{
          ...this.state,
          code,
          language,
          hidden,
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

