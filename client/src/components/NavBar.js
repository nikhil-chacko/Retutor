import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
    header: {
        flex: 1,
    },
}));

const NavBar = () => {
    const classes = useStyles();
    return (
        <div>
            <AppBar position='static'>
                <Toolbar>
                    <Typography className={classes.header} variant='h5'>
                        <Link to='/teachers'>Retutor</Link>
                    </Typography>
                    <Button variant='outlined' color='inherit'>
                        <Link to='/teachers'> Teachers</Link>
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default NavBar;
