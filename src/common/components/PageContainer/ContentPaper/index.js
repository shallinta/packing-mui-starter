/**
 * ContentPaper 页面主内容区
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import '../style.css';

const styles = theme => ({
  paper: {
    zIndex: 16,
    padding: '20px 20px 40px',
    width: '100%',
    minWidth: 800,
    maxWidth: 960,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  }
});

class ContentPaper extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    classes: PropTypes.object.isRequired,
    paper: PropTypes.bool.isRequired
  };

  render() {
    const {
      children,
      classes,
      paper
    } = this.props;
    if (paper) {
      return (
        <Paper className={classes.paper} styleName="content">
          {children}
        </Paper>
      );
    }
    return (
      <div styleName="content no-paper">
        {children}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ContentPaper);
