/**
 * 左侧导航栏
 */

import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { withStyles } from 'material-ui/styles';
import { MenuList, MenuItem } from 'material-ui/Menu';
import { ListItemText, ListItemIcon } from 'material-ui/List';
import BubbleChart from 'material-ui-icons/BubbleChart';

const styles = theme => ({
  menuItem: {
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    '&:hover': {
      paddingLeft: 50,
      backgroundColor: theme.palette.primary.main,
      '& svg': {
        color: theme.palette.getContrastText(theme.palette.primary.main)
      },
      '& h3': {
        color: theme.palette.getContrastText(theme.palette.primary.main)
      }
    }
  },
  menuItemActive: {
    backgroundColor: '#ccc'
  }
});

class Nav extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  render() {
    const { classes } = this.props;
    const pagePathName = window.location.pathname;

    return (
      <MenuList>
        <MenuItem
          button
          component="a"
          href="/mui-test.html"
          className={cn(classes.menuItem, { [classes.menuItemActive]: pagePathName === '/mui-test.html' })}
        >
          <ListItemIcon color="primary"><BubbleChart /></ListItemIcon>
          <ListItemText primary="Home" />
        </MenuItem>
        <MenuItem button component="a" className={cn(classes.menuItem, { [classes.menuItemActive]: pagePathName === '' })}>
          <ListItemIcon><BubbleChart /></ListItemIcon>
          <ListItemText primary="Mail" />
        </MenuItem>
        <MenuItem button className={cn(classes.menuItem, { [classes.menuItemActive]: pagePathName === '' })}>
          <ListItemIcon><BubbleChart /></ListItemIcon>
          <ListItemText primary="Music" />
        </MenuItem>
        <MenuItem button className={cn(classes.menuItem, { [classes.menuItemActive]: pagePathName === '' })}>
          <ListItemIcon><BubbleChart /></ListItemIcon>
          <ListItemText primary="Stars" />
        </MenuItem>
        <MenuItem button className={cn(classes.menuItem, { [classes.menuItemActive]: pagePathName === '' })}>
          <ListItemIcon><BubbleChart /></ListItemIcon>
          <ListItemText primary="About" />
        </MenuItem>
      </MenuList>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Nav);
