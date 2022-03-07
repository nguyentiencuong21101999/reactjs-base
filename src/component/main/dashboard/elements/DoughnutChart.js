import React from 'react';
import {
    Box,
    Typography,
    Stack,
    Divider,
    colors,
    useTheme
} from '@material-ui/core';
import CircleIcon from '@material-ui/icons/Circle';
import styled from '@emotion/styled';
import { Doughnut } from 'react-chartjs-2';
import Localize from 'service/localize';

const DoughnutChart = (props) => {
    const { ui } = props

    const handleData = (data) => {
        const total = data.totalUser / 100;
        return [data.totalPlanningUser / total, data.totalPregnantUser / total, data.totalHadBabyUser / total]
    }
    const theme = useTheme();
    const Color = {
        info: '#2CA5A0',
        warning: '#FFCA3C',
        error: '#FD5E5D'
    }

    const CircleIconCustom = styled(CircleIcon)`
        fill: ${props => Color[props.color]}   
    `
    const StackCustom = styled(Stack)`
        position: absolute;
    `

    const dataDonut = {
        datasets: [
            {
                data: handleData(ui.detailDashBoard),
                backgroundColor: [
                    Color.info,
                    Color.warning,
                    Color.error
                ],
                borderWidth: 8,
                borderColor: colors.common.white,
                hoverBorderColor: colors.common.white
            }
        ],
        // labels: ['Desktop', 'Tablet', 'Mobile']
    };

    const optionsDonut = {
        animation: false,
        cutoutPercentage: 80,
        cutout: 80,
        layout: { padding: 0 },
        legend: {
            display: false
        },
        maintainAspectRatio: false,
        responsive: true,
        tooltips: {
            backgroundColor: theme.palette.background.paper,
            bodyFontColor: theme.palette.text.secondary,
            borderColor: theme.palette.divider,
            borderWidth: 1,
            enabled: true,
            footerFontColor: theme.palette.text.secondary,
            intersect: false,
            mode: 'index',
            titleFontColor: theme.palette.text.primary
        }
    };

    return (
        <Stack
            direction="row" spacing={4}
        >
            <Stack
                direction="column"
                spacing={1}
                sx={{ minHeight: '100%' }}
            >
                <Stack
                    direction="column"
                    spacing={2}
                    sx={{ height: '50%' }}
                >
                    <Typography sx={{ fontSize: '20px', fontWeight: 600 }}>
                        {Localize.getLocalize("LC_CHART_USER")}
                    </Typography>
                    <Typography sx={{ fontSize: '14px', color: '#9AA1A9', fontWeight: 600 }}>
                        {Localize.getLocalize("LC_STATISTIC_BY_TARGET")}
                    </Typography>
                </Stack>
                <Stack
                    direction="column"
                    spacing={3}
                    justifyContent="flex-end"
                    sx={{ paddding: '30px', height: '50%' }}
                >
                    <Stack
                        direction="row"
                        spacing={2}
                    >
                        <CircleIconCustom color="error" fontSize="small" />
                        <Typography sx={{ fontSize: '14px', color: '#9AA1A9', fontWeight: 600 }}>
                            {Localize.getLocalize("LC_TARGET_PREPARE")}
                        </Typography>
                    </Stack>
                    <Stack
                        direction="row"
                        spacing={2}
                    >
                        <CircleIconCustom color="warning" fontSize="small" />
                        <Typography sx={{ fontSize: '14px', color: '#9AA1A9', fontWeight: 600 }}>
                            {Localize.getLocalize("LC_TARGET_PREGNANT")}
                        </Typography>
                    </Stack>
                    <Stack
                        direction="row"
                        spacing={2}
                    >
                        <CircleIconCustom color="info" fontSize="small" />
                        <Typography sx={{ fontSize: '14px', color: '#9AA1A9', fontWeight: 600 }}>
                         {Localize.getLocalize("LC_TARGET_BABY")}
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>

            <Stack
                direction="column"
                spacing={2}
                justifyContent="center"
                alignItems="center"
                sx={{ height: '280px', postion: 'relative' }}
            >
                <Doughnut
                    data={dataDonut}
                    options={optionsDonut}
                />
                <StackCustom
                    direction="column"
                    alignItems="center"
                    spacing={2}
                >
                    <Typography sx={{ fontSize: '20px', fontWeight: 600 }}>
                        {ui.detailDashBoard.totalUser}
                    </Typography>
                    <Typography sx={{ fontSize: '14px', color: '#9AA1A9', fontWeight: 600 }}>
                     {Localize.getLocalize("LC_TOTAL_USER")}
                    </Typography>
                </StackCustom>
            </Stack>
        </Stack>
    )
};

export default DoughnutChart;