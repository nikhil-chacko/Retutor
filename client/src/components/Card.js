import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        minWidth: 275,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    photo: {
        textAlign: 'center',
        border: '2px solid black',
        height: '150px',
        width: '150px',
        marginRight: '15px',
        alignSelf: 'center',
    },
});

export default function SimpleCard(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <div>
                <CardContent>
                    <Typography
                        className={classes.title}
                        color='textSecondary'
                        gutterBottom>
                        {props.institution}
                    </Typography>
                    <Typography variant='h5' component='h2'>
                        {props.fullName}
                    </Typography>
                    <Typography className={classes.pos} color='textSecondary'>
                        {props.teacherName}
                    </Typography>
                    <Typography variant='body2' component='p'>
                        <b> {props.rating} / 10</b>
                        <br />
                    </Typography>
                </CardContent>
                <CardActions>
                    <Link to={`/teachers/${props.teacherName}`}>
                        <Button size='small'>View Profile</Button>
                    </Link>
                </CardActions>
            </div>
            <div className={classes.photo}>
                <h1>PHOTO</h1>
            </div>
        </Card>
    );
}
