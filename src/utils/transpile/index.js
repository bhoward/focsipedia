import transform from './transform';
import errorBoundary from './errorBoundary';
import evalCode from './evalCode';

export const generateElement = ({ code = '', language = 'js', scope = {} }, errorCallback) => {
  const transformed = transform(code, language).jscode;
  return errorBoundary(evalCode(transformed, scope), errorCallback);
};

