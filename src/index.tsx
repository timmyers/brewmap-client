import * as React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { create } from 'jss';
import preset from 'jss-preset-default';
import JssProvider from 'react-jss/lib/JssProvider';
import createGenerateClassName from 'material-ui/styles/createGenerateClassName';
import App from './App';
import { client } from './apollo';

// Make styled components work with MUI.
const globalAny: any = global;
if (!globalAny.__INSERTION_POINT__) {
  globalAny.__INSERTION_POINT__ = true;
  const styleNode = document.createComment('insertion-point-jss');

  if (document.head) {
    document.head.insertBefore(styleNode, document.head.firstChild);
  }
}

const generateClassName = createGenerateClassName();
const jss = create(preset());

jss.options.insertionPoint = 'insertion-point-jss';

ReactDOM.render(
  <JssProvider jss={jss} generateClassName={generateClassName}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </JssProvider>,
  document.getElementById('root'),
);
