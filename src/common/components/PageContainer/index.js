/**
 * 页面容器
 * PageContainer 参数：
 * 1. [paper] {bool} 存在时以纸张形式承载页面内容，适用于二级详情页；不存在时适用于一级列表页。
 * 2. [menu] {bool} 存在时默认显示抽屉菜单，不存在时不默认显示。进入页面后可手动打开/隐藏
 * 3. [fab] {object} Floating Action Button(悬浮操作主按钮)。使用参考`/pages/approval/detail/index.js`
 */

import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Menu, { MenuItem } from 'material-ui/Menu';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import AccountCircleIcon from 'material-ui-icons/AccountCircle';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import Typography from 'material-ui/Typography';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import Nav from './Nav';
import ContentPaper from './ContentPaper';
import ContentFabContainer from './ContentFabContainer';
import './style.css';

const DRAWER_WIDTH = 240;
const APP_BAR_HEIGHT = 64;
const APP_BAR_HEIGHT_FULL = 320;

const styles = theme => ({
  appBar: {
    zIndex: 8,
    height: APP_BAR_HEIGHT,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    height: APP_BAR_HEIGHT,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    marginLeft: DRAWER_WIDTH,
    transition: theme.transitions.create(['width', 'height', 'margin'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  appBarSpread: {
    height: APP_BAR_HEIGHT_FULL,
    transition: theme.transitions.create(['height'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
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
    position: 'absolute',
    marginLeft: 0,
    width: '100%',
    padding: `0 ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    backgroundColor: theme.palette.background.default,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginTop: APP_BAR_HEIGHT
  },
  contentShift: {
    marginLeft: DRAWER_WIDTH,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
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
  static defaultProps = {
    className: '',
    fab: null,
    menu: false,
    paper: false
  };

  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    classes: PropTypes.object.isRequired,
    loadStatus: PropTypes.number.isRequired,
    fab: PropTypes.object,
    menu: PropTypes.bool,
    paper: PropTypes.bool
  };

  state = {
    menuVisible: false,
    anchorEl: null
  };

  paper = false;

  constructor(props) {
    super(props);
    const { menu, paper } = props;
    this.state.menuVisible = !!menu;
    this.paper = !!paper;
  }

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

  getUserInfo() {
    const userId = '';
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    if (!userId) {
      return (
        <div styleName="user-sign-area">
          <Button color="inherit" component="a" href="/mui-test.html">Login</Button>
        </div>
      );
    }
    return (
      <div styleName="user-sign-area">
        <Button
          aria-owns={open ? 'user-sign-appbar' : null}
          aria-haspopup="true"
          onClick={this.handleUserSign}
          color="inherit"
        >
          <AccountCircleIcon />
          <Typography color="inherit" styleName="username">
            {userId}
          </Typography>
        </Button>
        <Menu
          id="user-sign-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          open={open}
          onClose={this.handleUserSignClose}
        >
          <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }

  handleDrawerOpen = () => {
    this.setState({ menuVisible: true });
  };

  handleDrawerClose = () => {
    this.setState({ menuVisible: false });
  };

  handleUserSign = (e) => {
    this.setState({ anchorEl: e.currentTarget });
  };

  handleUserSignClose = () => {
    this.setState({ anchorEl: null });
  }

  handleLogout = () => {
    // logout
    this.setState({ anchorEl: null }, () => {
      // logout();
    });
  }

  render() {
    const { menuVisible } = this.state;
    const {
      children,
      classes,
      className,
      fab
    } = this.props;

    return (
      <div styleName="page-container">
        {/* { this.getLoading() } */}
        <AppBar className={cn(classes.appBar, { [classes.appBarSpread]: this.paper && !menuVisible, [classes.appBarShift]: menuVisible })} position="static">
          <Toolbar disableGutters={!menuVisible}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              className={cn(classes.menuButton, menuVisible && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit">
              Material-ui
            </Typography>
            <div styleName="spacing" />
            {this.getUserInfo()}
          </Toolbar>
        </AppBar>
        <Drawer
          {...(this.paper ? {} : { variant: 'persistent' })}
          classes={{ paper: classes.drawerPaper }}
          anchor="left"
          open={menuVisible}
          onClose={this.handleDrawerClose}
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
          className={cn(classes.content, { [classes.contentShift]: menuVisible }, className)}
          styleName="page-content-container"
        >
          <ContentPaper paper={this.paper}>
            {children}
          </ContentPaper>
          <ContentFabContainer
            paper={this.paper}
            verticalPosition={this.paper ? (APP_BAR_HEIGHT_FULL - APP_BAR_HEIGHT) : APP_BAR_HEIGHT}
            fab={(!menuVisible && fab) ? fab : false}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PageContainer);
