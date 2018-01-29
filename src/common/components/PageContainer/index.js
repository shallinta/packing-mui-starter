/**
 * 页面容器
 */

import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import Typography from 'material-ui/Typography';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import Nav from './Nav';
import './style.css';

const DRAWER_WIDTH = 240;

const styles = theme => ({
  appBar: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: 'none'
  },
  drawerPaper: {
    flexGrow: 0,
    width: DRAWER_WIDTH,
    height: '100vh'
  },
  content: {
    marginLeft: 0,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64
    }
  },
  contentShift: {
    marginLeft: DRAWER_WIDTH,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  }
});

class PageContainer extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
    loadStatus: PropTypes.number.isRequired
  };

  state = {
    menuVisible: true
  };

  getLoading() {
    const { loadStatus } = this.props;
    if (loadStatus === 0) {
      return (
        <div>加载中</div>
      );
    } else if (loadStatus === 2) {
      return (
        <div>加载失败</div>
      );
    }
    return null;
  }

  handleDrawerOpen = () => {
    this.setState({ menuVisible: true });
  };

  handleDrawerClose = () => {
    this.setState({ menuVisible: false });
  };

  render() {
    const { menuVisible } = this.state;
    const { children, classes } = this.props;

    return (
      <div styleName="page-container">
        {/* { this.getLoading() } */}
        <AppBar className={cn(classes.appBar, { [classes.appBarShift]: menuVisible })} >
          <Toolbar disableGutters={!menuVisible}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              className={cn(classes.menuButton, menuVisible && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography type="title" color="inherit" noWrap styleName="title">
              Persistent drawer
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
        <Drawer
          type="persistent"
          classes={{ paper: classes.drawerPaper }}
          anchor="left"
          open={menuVisible}
        >
          <div>
            <div className={classes.drawerHeader}>
              <IconButton onClick={this.handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <Nav />
          </div>
        </Drawer>
        <div
          className={cn(classes.content, { [classes.contentShift]: menuVisible })}
          styleName="page-content-container"
        >
          { children }
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PageContainer);
