/**
 * ContentFabContainer 页面主按钮容器
 */

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { withStyles } from 'material-ui/styles';
import Tooltip from 'material-ui/Tooltip';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import ClearIcon from 'material-ui-icons/Clear';
import '../style.css';

const FAB_SIZE = 56;
const FAB_ITEM_MARGIN = 20;
const FAB_BOTTOM_MARGIN = 160;

const styles = theme => ({
  fabContainer: {
    position: 'relative',
    zIndex: 16,
    margin: '0 20px 20px 100px',
    width: 56
  },
  toolTip: {
    whiteSpace: 'nowrap'
  },
  mainFab: {
    position: 'absolute',
    left: 0,
    top: 0
  },
  fabIcon: {
    transform: 'rotate(45deg)',
    transition: theme.transitions.create(['transform'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  fabIconRotate: {
    transform: 'rotate(90deg)',
    transition: theme.transitions.create(['transform'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  fabListItem: {
    position: 'absolute',
    left: 0,
    opacity: 1,
    transition: theme.transitions.create(['top', 'opacity'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  fabListItemShift: {
    opacity: 0,
    transition: theme.transitions.create(['top', 'opacity'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  }
});

class ContentFabContainer extends React.Component {
  static defaultProps = {
    paper: false
  };

  static propTypes = {
    classes: PropTypes.object.isRequired,
    verticalPosition: PropTypes.number.isRequired,
    fab: PropTypes.any.isRequired,
    paper: PropTypes.bool
  };

  state = {
    fabListFold: true
  };

  componentWillMount() {
    document.addEventListener('click', this.handleRequestClose);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleRequestClose);
  }

  handleRequestClose = (e) => {
    if (this.state.fabListFold) {
      return;
    }
    // eslint-disable-next-line
    const dom = ReactDOM.findDOMNode(this);
    if (dom && dom.contains(e.target)) {
      return;
    }
    this.setState({
      fabListFold: true
    });
  }

  handleClickFab = () => {
    const { fab } = this.props;
    if (fab) {
      const { action } = fab;
      if (action && typeof action === 'function') {
        action();
      } else if (fab.fabList && fab.fabList.length) {
        this.setState(({ fabListFold }) => ({ fabListFold: !fabListFold }));
      }
    }
  }

  getMainFab() {
    const { fab, classes } = this.props;
    if (fab) {
      const { icon } = fab;
      const { fabListFold } = this.state;
      if (icon) {
        return fabListFold
          ? icon
          : (<ClearIcon className={cn(classes.fabIcon, classes.fabIconRotate)} />);
      }
      return (
        <ClearIcon className={cn(classes.fabIcon, { [classes.fabIconRotate]: !fabListFold })} />
      );
    }
    return null;
  }

  getFabList() {
    const { paper, fab, classes } = this.props;
    const { fabList } = fab;
    const { fabListFold } = this.state;
    if (fab && fabList && fabList.length) {
      return fabList.reverse().map(({
        icon = (<AddIcon />),
        text = '',
        action = () => { },
        color,
        bgColor,
        margin = FAB_ITEM_MARGIN,
        ...rest
      }, fabIndex) => (
        <Tooltip
          key={`fab-list-item-${fabIndex + 1}`}
          className={classes.toolTip}
          title={text}
          placement="left"
        >
          <Button
            variant="fab"
            className={cn(classes.fabListItem, { [classes.fabListItemShift]: fabListFold })}
            style={{
              top: !fabListFold ? ((fabIndex + 1) * (FAB_SIZE + margin) * (paper ? 1 : -1)) : 0,
              color,
              backgroundColor: bgColor
            }}
            onClick={action}
            {...rest}
          >
            {icon}
          </Button>
        </Tooltip>
      ));
    }
    return null;
  }

  render() {
    const {
      paper,
      verticalPosition,
      fab,
      classes
    } = this.props;

    if (!fab) {
      return null;
    }

    const verticalMargin = paper
      ? (verticalPosition - (FAB_SIZE / 2))
      : (window.innerHeight - verticalPosition - FAB_BOTTOM_MARGIN - (FAB_SIZE / 2));

    let mainFabTipText = fab.text || '';
    if (!mainFabTipText && fab.fabList.length) {
      if (this.state.fabListFold) {
        mainFabTipText = '展开';
      }
    }
    if (!this.state.fabListFold) {
      mainFabTipText = '收起';
    }

    return (
      <div
        className={classes.fabContainer}
        style={{ marginTop: verticalMargin }}
      >
        {this.getFabList()}
        <Tooltip className={classes.toolTip} title={mainFabTipText} placement="left">
          <Button className={classes.mainFab} variant="fab" color="secondary" onClick={this.handleClickFab}>
            {this.getMainFab()}
          </Button>
        </Tooltip>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ContentFabContainer);
