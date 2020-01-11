import React, { Component } from 'react';

import MyLiveContext from './MyLiveContext';
import { generateElement, renderElementAsync } from '../../utils/transpile';

export default class MyLiveProvider extends Component {
  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount() {
    const { code, language, scope, noInline } = this.props;

    this.transpile({ code, language, scope, noInline });
  }

  componentDidUpdate({
    code: prevCode,
    language: prevLanguage,
    scope: prevScope,
    noInline: prevNoInline
  }) {
    const { code, language, scope, noInline } = this.props;
    if (
      code !== prevCode ||
      language !== prevLanguage ||
      scope !== prevScope ||
      noInline !== prevNoInline
    ) {
      this.transpile({ code, language, scope, noInline });
    }
  }

  onChange(code) {
    const { language, scope, noInline } = this.props;
    this.transpile({ code, language, scope, noInline });
  }

  onError(error) {
    this.setState({ error: error.toString() });
  }

  transpile({ code, language, scope, noInline = false }) {
    // Transpilation arguments
    const input = {
      code,
      language,
      scope
    };

    const errorCallback = err =>
      this.setState({ element: undefined, error: err.toString() });
    const renderElement = element => this.setState({ ...state, element });

    // State reset object
    const state = { unsafeWrapperError: undefined, error: undefined };

    try {
      if (noInline) {
        this.setState({ ...state, element: null }); // Reset output for async (no inline) evaluation
        renderElementAsync(input, renderElement, errorCallback);
      } else {
        renderElement(generateElement(input, errorCallback));
      }
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
          onChange: this.onChange.bind(this)
        }}
      >
        <strong>Foo!</strong>
        {children}
      </MyLiveContext.Provider>
    );
  }
}

MyLiveProvider.defaultProps = {
  code: '',
  noInline: false,
  language: 'js',
  disabled: false
};

