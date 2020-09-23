import * as React from 'react';
import { Checkbox, Typography, TextField, Paper } from '@material-ui/core';

export default function AchievEditor() {

    React.useEffect(() => {

    })

    return (<div>
        <div>
            <Typography variant={'h4'}>Achievement Edit</Typography>
         <Checkbox/> Feats of Strength
        </div>
        <TextField label={'Achievement Text'}  defaultValue={'Still Alive'}/>
        <div>
            
        </div>
    </div>);
}