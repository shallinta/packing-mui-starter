/**
 * 左侧导航栏
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import cn from 'classnames';
import List, { ListItem, ListItemText, ListItemIcon } from 'material-ui/List';
import BubbleChart from 'material-ui-icons/BubbleChart';

export default class Nav extends React.Component {
  render() {
    return (
      <List>
        <ListItem button component="a" href="/mui-test/index.pug">
          <ListItemIcon color="primary"><BubbleChart /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component="a" href="/test.pug">
          <ListItemIcon><BubbleChart /></ListItemIcon>
          <ListItemText primary="Mail" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><BubbleChart /></ListItemIcon>
          <ListItemText primary="Music" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><BubbleChart /></ListItemIcon>
          <ListItemText primary="Stars" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><BubbleChart /></ListItemIcon>
          <ListItemText primary="About" />
        </ListItem>
      </List>
    );
  }
}
