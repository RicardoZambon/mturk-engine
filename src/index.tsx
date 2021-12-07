import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import { API_URL } from './constants';
import { clearDom, createRootDiv } from './utils/config';
import { AppProvider as PolarisProvider } from '@shopify/polaris';

import App from './components/App';
import { createToastLayer } from 'utils/createToastLayer';
import { IToaster } from '@blueprintjs/core';

// If not in development, kick off production specific DOM mutations.
if (API_URL !== 'http://localhost:7777') {
  clearDom();
  createRootDiv();
}

export const TopRightToaster: IToaster = createToastLayer();

ReactDOM.render(
  <PolarisProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </PolarisProvider>,
  document.querySelector('#root') as HTMLElement
);

setTimeout(() => {
    var toasterContainer = document.body.querySelector('.bp3-overlay.bp3-toast-container');
    if (toasterContainer) {
        (toasterContainer as HTMLElement).style.position = 'fixed';
    }
}, 200);