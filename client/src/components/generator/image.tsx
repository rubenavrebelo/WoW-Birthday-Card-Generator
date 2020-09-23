import * as React from 'react';
import { Typography, ButtonBase, Button, makeStyles } from '@material-ui/core';
import notrashy from '../../static/notrashy-base.jpg'


const useStyles = makeStyles((theme) => ({
    status: {
        position: 'absolute', marginTop: '20.4%', left: '24%', height: '9%', width: '4.5%', backgroundColor: 'rgba(0, 0, 0, 0)',
        border: 'none',
        '&:hover': {
            backgroundColor: 'rgba(224, 172, 51, 0.2)',
            cursor: 'pointer'
        }
    },
    skill: {position: 'absolute', marginTop: '27.7%', left: '24%', height: '9%', width: '4.5%', 
        backgroundColor: 'rgba(0, 0, 0, 0)',
        border: 'none',
        '&:hover': {
        backgroundColor: 'rgba(224, 172, 51, 0.2)',
        cursor: 'pointer'
    }},
    achiev: 
    {
        position: 'absolute', 
        marginTop: '35%', 
        left: '29.8%', 
        height: '8%', 
        width: '4.5%',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        border: 'none',
        '&:hover': {
            backgroundColor: 'rgba(224, 172, 51, 0.2)',
            cursor: 'pointer'
        }
    }
}));

export default function Image() {

    const classes = useStyles();

    React.useEffect(() => {

    })

    return (<div>
        <img src={notrashy} style={{position: 'relative', width: '100%'}} />
        <button className={classes.status}/>
        <button className={classes.skill}/>
        <button className={classes.achiev}/>
    </div>);
}