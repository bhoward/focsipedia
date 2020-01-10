import transform from './transform';
import errorBoundary from './errorBoundary';
import evalCode from './evalCode';

export const generateElement = ({ code = '', language = 'js', scope = {} }, errorCallback) => {
  const transformed = transform(code, language).jscode;
  return errorBoundary(evalCode(transformed, scope), errorCallback);
};

export const renderElementAsync = (
  { code = '', language = 'js', scope = {} },
  resultCallback,
  errorCallback
  // eslint-disable-next-line consistent-return
) => {
  const render = element => {
    if (typeof element === 'undefined') {
      errorCallback(new SyntaxError('`render` must be called with valid JSX.'));
    } else {
      resultCallback(errorBoundary(element, errorCallback));
    }
  };

  if (!/render\s*\(/.test(code)) {
    return errorCallback(
      new SyntaxError('No-Inline evaluations must call `render`.')
    );
  }

  evalCode(transform(code, language).jscode, { ...scope, render });
};
