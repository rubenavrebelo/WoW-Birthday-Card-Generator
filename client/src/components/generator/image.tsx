import * as React from 'react';
import { Typography, ButtonBase, Button, makeStyles } from '@material-ui/core';
import notrashy from '../../static/notrashy-base.jpg'


const useStyles = makeStyles((theme) => ({
    status: {
        position: 'absolute', marginTop: '20.5%', left: '24%', height: '9%', width: '5%', '&:hover': {
            backgroundColor: 'rgba(224, 172, 51, 0.15)',
        }
    },
    skill: {position: 'absolute', marginTop: '28%', left: '24%', height: '9%', width: '5%', '&:hover': {
        backgroundColor: 'rgba(224, 172, 51, 0.15)',
    }},
    achiev: 
    {
        position: 'absolute', 
        marginTop: '35%', 
        left: '29.8%', 
        height: '8%', 
        width: '5%', 
        '&:hover': {
            backgroundColor: 'rgba(224, 172, 51, 0.15)',
        }
    }
}));

export default function Image() {

    const classes = useStyles();

    React.useEffect(() => {

    })

    return (<div>
        <img src={notrashy} style={{width: '60%', position: 'relative'}} />
        <Button className={classes.status}/>
        <Button className={classes.skill}/>
        <Button className={classes.achiev}/>
    </div>);
}