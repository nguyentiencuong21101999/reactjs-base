import React from 'react';
import { Line } from 'react-chartjs-2';
import styled from '@emotion/styled'
import {
  Stack
} from '@material-ui/core';
import Localize from 'service/localize';
const data = (value) => {
  const labels = []
  const data = []
  value.forEach((item, index) => {
    labels.push(`${item.month}/${item.year}`)
    data.push(Number(item.total))
  })
  return {
    labels: labels.reverse(),
    datasets: [
      {
        label: '# of Votes',
        data: data.reverse(),
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  }
};

const options = {
  // scales: {
  //   yAxes: [
  //     {
  //       ticks: {
  //         beginAtZero: true,
  //       },
  //     },
  //   ],
  // },
};

const Title = styled.span`
  font-size: 20px;
  font-weight: 600;
`

const SubTitle = styled.span`
  color: "#A0A4A8";
  font-size: 12px;
`

const LineChart = (props) => {
  const { ui } = props

  return (
    <>
      <div className='header'>
        <Stack direction="row" spacing={4} alignItems="center" >
          <Title>{Localize.getLocalize('LC_CHART_NEW_USER')}</Title>
          <SubTitle>{Localize.getLocalize('LC_STATISTIC_BY_06_MONTH')}</SubTitle>
        </Stack>
        {/* <div className='links'>
        <a
          className='btn btn-gh'
          href='https://github.com/reactchartjs/react-chartjs-2/blob/master/example/src/charts/Line.js'
        >
          Github Source
        </a>
      </div> */}
      </div>
      <Line data={data(ui.detailDashBoard.totalUserByMonth)} options={options} />
    </>
  )

}

export default LineChart;