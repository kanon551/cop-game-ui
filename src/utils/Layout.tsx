import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { styled } from 'styled-components';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}


const NewTypography = styled(Typography)`
    color: black;
`

function ElevationScroll(props: Props) {
  const { children, window } = props;
  // Note that you normally won't need to set the windosw ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

export default function ElevateAppBar(props: Props) {
  const { children, window } = props;
  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar sx={{
          background: "white",
          border: '1px solid lightgrey',
        }}>
          <Toolbar>
            <NewTypography variant="h6">
              Yocket COP GAME
            </NewTypography>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
      {/* <Container > */}
        <Box sx={{ my: 1}}>
          {
            children
          }
        </Box>
      {/* </Container> */}
    </React.Fragment>
  );
}
