var chartDom = document.getElementById('chart1');
var myChart = echarts.init(chartDom, 'purple-passion');
var option;

option = {
    title: {
        text: '配电消耗',
        subtext: '仿真数据'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        // prettier-ignore
        data: ['00:00', '01:15', '02:30', '03:45', '05:00', '06:15', '07:30', '08:45', '10:00', '11:15', '12:30', '13:45', '15:00', '16:15', '17:30', '18:45', '20:00', '21:15', '22:30', '23:45']
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            formatter: '{value} W'
        },
        axisPointer: {
            snap: true
        }
    },
    visualMap: {
        show: false,
        dimension: 0,
        pieces: [
            {
                lte: 6,
                color: 'green'
            },
            {
                gt: 6,
                lte: 8,
                color: 'red'
            },
            {
                gt: 8,
                lte: 14,
                color: 'green'
            },
            {
                gt: 14,
                lte: 17,
                color: 'red'
            },
            {
                gt: 17,
                color: 'green'
            }
        ]
    },
    series: [
        {
            name: 'Electricity',
            type: 'line',
            smooth: true,
            // prettier-ignore
            data: [300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380, 390, 400, 500, 600, 750, 800, 700, 600, 400],
            markArea: {
                itemStyle: {
                    color: 'rgba(0, 0, 0, 0.6)'
                },
                data: [
                    [
                        {
                            name: '早高峰',
                            xAxis: '07:30'
                        },
                        {
                            xAxis: '10:00'
                        }
                    ],
                    [
                        {
                            name: '晚高峰',
                            xAxis: '17:30'
                        },
                        {
                            xAxis: '21:15'
                        }
                    ]
                ]
            }
        }
    ]
};

option && myChart.setOption(option);