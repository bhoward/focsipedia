import React, { Component, Fragment } from 'react';
// import PropTypes from 'prop-types';
import Editor from 'react-simple-code-editor';
import Highlight, { Prism } from 'prism-react-renderer';
import { theme as liveTheme } from '../../constants/theme';

class CodeEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: ''
    };
  }

  updateContent(code) {
    this.setState({ code }, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state.code);
      }
    });
  }

  highlightCode(code) {
    return (<Highlight
      Prism={Prism}
      code={code}
      theme={this.props.theme || liveTheme}
      language={this.props.language}
    >
      {({ tokens, getLineProps, getTokenProps }) => (
        <Fragment>
          {tokens.map((line, i) => (
            // eslint-disable-next-line react/jsx-key
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                // eslint-disable-next-line react/jsx-key
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </Fragment>
      )}
    </Highlight>);
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const {
      style,
      code: _code,
      onChange,
      language,
      theme,
      ...rest
    } = this.props;
    const { code } = this.state;

    const baseTheme =
      theme && typeof theme.plain === 'object' ? theme.plain : {};

    return (
      <Editor
        value={code}
        padding={10}
        highlight={this.highlightCode.bind(this)}
        onValueChange={this.updateContent.bind(this)}
        style={{
          whiteSpace: 'pre',
          fontFamily: 'monospace',
          ...baseTheme,
          ...style
        }}
        {...rest}
      />
    );
  }
}

// CodeEditor.propTypes = {
//   code: PropTypes.string,
//   disabled: PropTypes.boolean,
//   language: PropTypes.string,
//   onChange: PropTypes.func,
//   style: PropTypes.object,
//   theme: PropTypes.object
// };

CodeEditor.getDerivedStateFromProps = function(props, state) {
  if (props.code !== state.prevCodeProp) {
    return { code: props.code, prevCodeProp: props.code };
  }

  return null;
};

export default CodeEditor;
