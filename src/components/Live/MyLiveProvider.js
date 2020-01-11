import React, { Component } from 'react';

import MyLiveContext from './MyLiveContext';
import { generateElement } from '../../utils/transpile';

export default class MyLiveProvider extends Component {
  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount() {
    const { code, language, scope } = this.props;

    this.transpile({ code, language, scope });
  }

  componentDidUpdate({
    code: prevCode,
    language: prevLanguage,
    scope: prevScope
  }) {
    const { code, language, scope } = this.props;
    if (
      code !== prevCode ||
      language !== prevLanguage ||
      scope !== prevScope
    ) {
      this.transpile({ code, language, scope });
    }
  }

  onChange(code) {
    const { language, scope } = this.props;
    this.transpile({ code, language, scope });
  }

  onError(error) {
    this.setState({ error: error.toString() });
  }

  transpile({ code, language, scope }) {
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
      renderElement(generateElement(input, errorCallback));
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
        {children}
      </MyLiveContext.Provider>
    );
  }
}

MyLiveProvider.defaultProps = {
  code: '',
  language: 'js',
  disabled: false
};

