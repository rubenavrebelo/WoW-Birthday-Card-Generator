import * as React from 'react';
import { Typography, Paper, Checkbox, TextField } from '@mui/material';

export default function StatusEditor() {

    React.useEffect(() => {

    })

    return (<Paper>
        <div>
            <Typography variant={'h5'}>Status</Typography>
         <Checkbox/> Feats of Strength
        </div>
        <TextField label={'Achievement Text'}/>
     
    </Paper>);
}