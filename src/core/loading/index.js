import React from 'react';
import PropTypes from 'prop-types'

import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';

const CircularIndeterminate = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: "center" }}>
      <CircularProgress />
    </Box>
  );
}

CircularIndeterminate.defaultProps = {
}

CircularIndeterminate.prototype = {
}

export default CircularIndeterminate
