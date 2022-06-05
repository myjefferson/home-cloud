import * as React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';

import { Div } from './style/circularIndeterminate'

export default function CircularIndeterminate(props) {
  return (
    <>
      <Div style={{display: props.display}}>
        <div>
          <Box sx={{ display: props.display, justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
          <p>Carregando</p>
        </div>
      </Div>
    </>
  );
}