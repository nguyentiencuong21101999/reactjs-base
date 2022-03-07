import React from 'react'
import Config from 'config';
import { Typography, Stack } from '@material-ui/core';
import Localize from 'service/localize';

function Copyright() {
  return (
    <Stack sx={{ color: "#6B778C" }}>
      <Typography variant="body2" align="center">
        {Localize.getLocalize("LC_COPYRIGHT")} © 2021 - Kingbee 
      </Typography>
      <Typography variant="body2" align="center">
        {Localize.getLocalize("LC_VERSION")} {Config.version}
      </Typography>
    </Stack>
  );
}
export default Copyright
