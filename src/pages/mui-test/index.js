/**
 * mui-test 页面
 * 2018-1-25
 */

import React from 'react';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
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

    const fab = {
      text: 'Floating Action Button',
      fabList: [
        {
          icon: <AddIcon />,
          text: '示例按钮'
        }
      ]
    };

    return (
      <PageContainer styleName="content-container" loadStatus={loadStatus} paper fab={fab}>
        <h2>Title</h2>
        <p>Code html here</p>
        <div>
          <Button variant="raised" color="secondary">Button</Button>
        </div>
        <br />
        <div>
          <Button color="primary">Button</Button>
        </div>
      </PageContainer>
    );
  }
}

export default Page;
