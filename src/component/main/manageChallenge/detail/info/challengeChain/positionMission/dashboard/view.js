import React from 'react';
import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid,
  Typography
} from '@material-ui/core';
import Budget from './elements/NewUserChart';
import LatestOrders from './elements/LatestOrders';
import LatestProducts from './elements/LatestProducts';
import Sales from './elements/Sales';
import TasksProgress from './elements/TasksProgress';
import TotalCustomers from './elements/TotalCustomers';
import TotalProfit from './elements/TotalProfit';
import TrafficByDevice from './elements/TrafficByDevice';

import Count from './elements/Count';
import DoughnutChart from './elements/DoughnutChart';
import NewUserChart from './elements/NewUserChart';

const View = (props) => {
  const { ui } = props
  return (
    <>
      <Helmet>
        <title>Dashboard | Intelin Co., Ltd.</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <Typography variant="h3" sx={{ marginBottom: '30px' }}>Dashboard</Typography>
          <Grid
            container
            spacing={3}
            sx={{ padding: '10px' }}
          >
            <Grid
              item
              lg={12}
              sm={12}
              xl={12}
              xs={12}
              sx={{ mb: '30px' }}
            >
              <Count ui={ui} />
            </Grid >

            <Grid
              item
              lg={6}
              md={12}
              xl={12}
              xs={12}
            >
              <DoughnutChart ui={ui} />
            </Grid>

            <Grid
              item
              lg={6}
              md={12}
              xl={12}
              xs={12}
            >
              <NewUserChart ui={ui} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default View;
