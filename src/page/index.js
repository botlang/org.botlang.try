import Grid from 'material-ui/Grid';
import Header from './../component/Header';
import Paper from 'material-ui/Paper';
import React from 'react';
import { withStyles } from 'material-ui/styles';
import Workspace from './../component/Workspace'

import './index.css';

const styles = theme => ({
  root: {
    width: '100%'
  },
  paper: {
    width: '100%',
    // padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class Index extends React.Component {
  render() {
    const classes = this.props.classes;

    return (
      <div className={classes.root}>
        <Header />
        <Grid container className={classes.root}>
          <Grid item md={3}></Grid>
          <Grid item md={6}>
            <Paper className={classes.paper}><Workspace /></Paper>
          </Grid>
          <Grid item md={3}></Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Index);
