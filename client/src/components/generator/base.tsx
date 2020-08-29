import * as React from 'react';
import { Typography } from '@material-ui/core';
import Image from './image';
import AchievEditor from './achievement-editor';
import StatusEditor from './status-editor';

export default function BaseImage() {

    React.useEffect(() => {

    })

    return (<div style={{overflowY:'auto'}}>
        <Typography variant={'h3'}>Hi, Notrashy</Typography>
        <Image/>
        <AchievEditor/>
        <StatusEditor/>
    </div>);
}