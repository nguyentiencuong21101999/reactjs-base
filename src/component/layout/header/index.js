import React from 'react';
import { Box, Typography, Tab, Button, Stack, Avatar, Chip } from "@material-ui/core";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { padding, width } from '@material-ui/system';
import { MarginRounded } from '@material-ui/icons';
const Header = (props   ) => {
    const {html} = props    
    const matches = useMediaQuery('(min-width:1200px)');

    const styleHeader = {
        typography: "header",
        display: "flex",
        justifyContent: "space-between",
        position:'fixed',
        top:0,
        right:0,
        left:0,
        marginTop:"64px",
        marginLeft:matches ? "256px" : 0,
        padding:"24px",
        backgroundColor:"#fff",
        zIndex:100
      }
    return (
      <Stack sx={styleHeader}>
       {html}
      </Stack>
    );
  };

  
  export default Header;
  