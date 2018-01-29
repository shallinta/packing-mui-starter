/**
 * mui-test 页面入口
 * 2018-1-25
 */

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
