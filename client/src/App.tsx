import * as React from 'react';
import BaseImage from "./components/generator/base";
import RealmCharSelector from './components/realm-character/selector';
import bg from './static/background22.jpg';
import { Typography } from '@material-ui/core';

function App() {
  return (
    <div style={{backgroundImage: `url(${bg})`, height: '100vh', backgroundSize: 'cover', boxSizing: 'border-box',
    display: 'flex', flexDirection: 'column', overflowY: 'hidden'}}>
      <BaseImage/>
    </div>
  );
}

export default App;
