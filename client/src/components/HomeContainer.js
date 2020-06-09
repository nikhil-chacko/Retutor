import React from 'react';
import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
    left: {
        margin: '100px 0',
    },
    login: {
        marginRight: '10px',
    },
    h6: {
        margin: '10px 0',
        fontWeight: 'lighter',
    },
}));

const HomeContainer = () => {
    const classes = useStyles();
    return (
        <div className={classes.left}>
            <Typography variant='h2'>
                An integrated social Platform for both teachers and students.
            </Typography>

            <Typography className={classes.h6} variant='h6'>
                Join Now!
            </Typography>

            <Button
                className={classes.login}
                variant='contained'
                color='secondary'>
                Login With Google
            </Button>
        </div>
    );
};

export default HomeContainer;
