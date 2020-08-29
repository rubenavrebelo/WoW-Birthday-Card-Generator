import * as React from 'react';
import {makeStyles, InputBase, Paper, Divider, Button} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PersonIcon from '@material-ui/icons/Person';
import EmojiNatureIcon from '@material-ui/icons/EmojiNature';
import EURealms from '../../types/eu-realm';
import USRealms from '../../types/us-realm';


const useStyles = makeStyles((theme) => ({
    root: {
      padding: '5px 10px 5px 10px',
      display: 'flex',
      alignItems: 'center',
      width: '40% ',
      position: 'absolute',
      top:0,
      bottom: 0,
      left: 0,
      right: 0,
      margin: 'auto',
      height: 50
    }
}));

export default function RealmCharSelector() {
    const classes = useStyles();

    const [charName, setCharName] = React.useState<String>("");
    const [realm, setRealm] = React.useState<String | null>("");

    const sendRequest = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ char: charName, realm: realm })
        };

        fetch('http://localhost:8080/base', requestOptions)
            .then(response => response.json)
    }

    return (
    <Paper className={classes.root}>
        <InputBase placeholder={'Character Name'} 
            startAdornment={<PersonIcon style={{marginRight: 5, color: '#4CB0C2'}}/>} 
            style={{width: '50%'}}
            onChange={(e) => setCharName(e.target.value)}/>
        <Divider  orientation="vertical" flexItem />
        <Autocomplete
            style={{marginLeft: 10}}
            options={EURealms().concat(USRealms())}
            onChange={(event: any, newValue: string | null)  =>  setRealm(newValue)}
            renderInput={(params) =>  
                <div ref={params.InputProps.ref}>
                    <InputBase placeholder={'Realm'} {...params.inputProps} startAdornment={<EmojiNatureIcon style={{marginRight: 5, color: '#E0AC33'}}/>} />
                </div>}
        />
        <Button disabled={charName === "" || realm === "" || realm === null}>Go</Button>
    </Paper>);
}