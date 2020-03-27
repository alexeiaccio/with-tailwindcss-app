import React from 'react';
import ReactDOM from 'react-dom';
import { register } from 'codelift';

register({ React, ReactDOM });

import { store } from '../store';
import '../styles/index.css';

function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      import('reactotron-react-js').then(async ({ default: Reactotron }) => {
        await import('../utils/ReactotronConfig');

        await Reactotron.trackMstNode(store);
      });
    }
  }, []);
  return <Component {...pageProps} store={store} />;
}

export default MyApp;
