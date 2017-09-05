import AppBar from 'material-ui/AppBar';
import Botlang from 'botlang';
import React from 'react';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const styles = {
  root: {
    width: '100%',
  }
};

function Header(props) {
  const classes = props.classes;

  return (
    <div className={classes.root}>
      <AppBar position='static' color='primary'>
        <Toolbar>
          <Typography type='title' color='inherit'>
            {`Try Botlang - Online REPL (v${Botlang.version()})`}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withStyles(styles)(Header);
