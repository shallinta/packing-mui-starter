/**
 * {{demo}} 页面入口
 * {{date}}
 */

import 'typeface-roboto';
import React from 'react';
import ReactDOM from 'react-dom';
import Page from '.';

import 'typeface-roboto';
import React from 'react';
import ReactDOM from 'react-dom';
import ThemeProvider from 'common/components/ThemeProvider';
import Page from '.';

ReactDOM.render(
  (
    <ThemeProvider>
      <Page />
    </ThemeProvider>
  ),
  document.querySelector('#app')
);

if (module.hot) {
  module.hot.accept();
}
