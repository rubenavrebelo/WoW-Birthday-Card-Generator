import * as React from 'react';
import { Typography, Paper, Tabs, Tab, Theme, withStyles, createStyles } from '@material-ui/core';
import Image from './image';
import AchievEditor from './achievement-editor';
import StatusEditor from './status-editor';

const AntTabs = withStyles({
    root: {
      borderBottom: '1px solid #e8e8e8',
    },
    indicator: {
      backgroundColor: '#1890ff',
    },
  })(Tabs);

    
  interface StyledTabsProps {
    value: number;
    onChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
  }
  
  const AntTab = withStyles((theme: Theme) =>
    createStyles({
      root: {
        textTransform: 'none',
        minWidth: 72,
        fontWeight: theme.typography.fontWeightRegular,
        marginRight: theme.spacing(4),
        fontFamily: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
          color: '#40a9ff',
          opacity: 1,
        },
        '&$selected': {
          color: '#1890ff',
          fontWeight: theme.typography.fontWeightMedium,
        },
        '&:focus': {
          color: '#40a9ff',
        },
      },
      selected: {},
    }),
  )((props: StyledTabProps) => <Tab disableRipple {...props} />);

  interface StyledTabProps {
    label: string;
  }

export default function BaseImage() {

    React.useEffect(() => {

    })

    return (<div style={{overflowY:'auto'}}>
        <Typography variant={'h3'}>Hi, Notrashy</Typography>
        <div style={{width: '70%', margin: '0 auto'}}>
        <Image/>
        <Paper style={{width: '100%'}}>
                <Tabs value={0} variant="fullWidth">
                    <AntTab label={'Achievement'}/>
                    <AntTab label={'Status'}/>
                    <AntTab label={'Level Up'}/>
                    <AntTab label={'Skill'}/>
                </Tabs>
                <div style={{padding: 25}}>
                <AchievEditor/>
                </div>
        </Paper>
        </div>
    </div>);
}