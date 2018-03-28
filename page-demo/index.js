/**
 * {{title}} 页面
 * {{pageName}}
 * {{date}}
 */

import React from 'react';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import PageContainer from 'common/components/PageContainer';
import store from './store';
import './style.css';

@observer
class Page extends React.Component {

  componentWillReact() {
    // console.log('有被观察的变量更新了！');
  }

  @action.bound
  handleClick() {
    // action.bound 可自动绑定this
  }

  render() {
    const { loadStatus } = store;

    return (
      <PageContainer styleName="content-container" loadStatus={loadStatus}>
        <h2>Title</h2>
        <p>Code html here</p>
        <div>
          <Button raised color="secondary">Button</Button>
        </div>
        <br />
        <Button fab color="primary" aria-label="add">
          <AddIcon />
        </Button>
      </PageContainer>
    );
  }
}

export default Page;
