var theChartType = 0;
var themesID = 0;
var themes = ['vintage', 'dark', 'westeros', 'essos', 'wonderland', 'walden', 'chalk', 'infographic', 'macarons', 'roma', 'shine', 'purple-passion'];

function ShowEchars(chartType, tID = 0) {
  var boxs = ['ChartTable', 'ChartLine', 'ChartBar', 'ChartPie', 'ChartRing', 'ChartArea', 'ChartRadar', 'ChartNum', 'ChartHtml'];
  for (var i = 0; i < boxs.length; i++) {
    if (i == chartType) { $("#" + boxs[i]).show(); } else { $("#" + boxs[i]).hide(); }
  }

  theChartType = chartType;
  themesID = tID;

  switch (chartType) {
    case 0: break;
    case 1: ShowLine(); break;
    case 2: ShowBar(); break;
    case 3: ShowPie(); break;
    case 4: ShowRing(); break;
    case 5: ShowArea(); break;
    case 6: ShowRadar(); break;
    case 7: break;
    case 8: break;
    default:
  }
}

function ShowLine() {
  var json = JSON.parse(document.getElementById("ChartTableJson").value);

  var lineChart;

  if (themesID > 0) {
    lineChart = echarts.init(document.getElementById("ChartLine"), themes[themesID - 1]);
  }
  else {
    lineChart = echarts.init(document.getElementById("ChartLine"));
  }

  var lineoption = {
    title: {
      text: '部门资源'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: json.legendData
    },
    grid: {
      x: 40,
      x2: 40,
      y2: 24
    },
    calculable: true,
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: json.xAxisData
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          formatter: '{value}'
        }
      }
    ],
    series: json.series
  };

  for (var i = 0; i < lineoption.series.length; i++) {
    lineoption.series[i].type = 'line';
  }
  if ($("#BackColorTransparent").is(":checked")) {
    lineoption.backgroundColor = "transparent";
  }
  //加载数据图表
  lineChart.setOption(lineoption);
  $(window).resize(lineChart.resize);
}

function ShowBar() {
  var json = JSON.parse(document.getElementById("ChartTableJson").value);

  var lineChart;

  if (themesID > 0) {
    lineChart = echarts.init(document.getElementById("ChartBar"), themes[themesID - 1]);
  }
  else {
    lineChart = echarts.init(document.getElementById("ChartBar"));
  }

  var lineoption = {
    title: {
      text: '部门资源'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: json.legendData
    },
    calculable: true,
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: json.xAxisData
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          formatter: '{value}'
        }
      }
    ],
    series: json.series
  };

  //加载数据图表

  for (var i = 0; i < lineoption.series.length; i++) {
    lineoption.series[i].type = 'bar';
  }
  if ($("#BackColorTransparent").is(":checked")) {
    lineoption.backgroundColor = "transparent";
  }
  lineChart.setOption(lineoption);
  $(window).resize(lineChart.resize);
}

function ShowPie() {
  var json = JSON.parse(document.getElementById("ChartTableJson").value);

  var lineChart;

  if (themesID > 0) {
    lineChart = echarts.init(document.getElementById("ChartPie"), themes[themesID - 1]);
  }
  else {
    lineChart = echarts.init(document.getElementById("ChartPie"));
  }

  var lineoption = {
    title: {
      text: '部门资源'
    },
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: '占比',
        type: 'pie',
        radius: '50%',
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        data: json.seriesDate
      }
    ]
  };

  //加载数据图表

  //for (var i = 0; i < lineoption.series.length; i++) {
  //  lineoption.series[i].type = 'pie';
  //}
  if ($("#BackColorTransparent").is(":checked")) {
    lineoption.backgroundColor = "transparent";
  }
  lineChart.setOption(lineoption);
  $(window).resize(lineChart.resize);
}

function ShowRing() {
  var json = JSON.parse(document.getElementById("ChartTableJson").value);

  var lineChart;

  if (themesID > 0) {
    lineChart = echarts.init(document.getElementById("ChartRing"), themes[themesID - 1]);
  }
  else {
    lineChart = echarts.init(document.getElementById("ChartRing"));
  }

  var lineoption = {
    title: {
      text: '部门资源'
    },
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: '占比',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '40',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: json.seriesDate
      }
    ]
  };

  //加载数据图表

  //for (var i = 0; i < lineoption.series.length; i++) {
  //  lineoption.series[i].type = 'pie';
  //}
  if ($("#BackColorTransparent").is(":checked")) {
    lineoption.backgroundColor = "transparent";
  }
  lineChart.setOption(lineoption);
  $(window).resize(lineChart.resize);
}

function ShowArea() {
  var json = JSON.parse(document.getElementById("ChartTableJson").value);

  var lineChart;

  if (themesID > 0) {
    lineChart = echarts.init(document.getElementById("ChartArea"), themes[themesID - 1]);
  }
  else {
    lineChart = echarts.init(document.getElementById("ChartArea"));
  }
  var lineoption = {
    title: {
      text: '部门资源'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: json.legendData
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: json.xAxisData
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: json.series
  };

  for (var i = 0; i < lineoption.series.length; i++) {
    lineoption.series[i].type = 'line';
    lineoption.series[i].stack = 'Total';
    lineoption.series[i].areaStyle = {};
  };

  //加载数据图表
  //console.log(echarts.version);
  if ($("#BackColorTransparent").is(":checked")) {
    lineoption.backgroundColor = "transparent";
  }
  lineChart.setOption(lineoption);
  $(window).resize(lineChart.resize);
}

function ShowRadar() {
  var json = JSON.parse(document.getElementById("ChartTableJson").value);

  var lineChart;

  if (themesID > 0) {
    lineChart = echarts.init(document.getElementById("ChartRadar"), themes[themesID - 1]);
  }
  else {
    lineChart = echarts.init(document.getElementById("ChartRadar"));
  }
  var lineoption = {
    title: {
      text: '部门资源',
      subtext: '纯属虚构'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      orient: 'vertical',
      x: 'right',
      y: 'bottom',
      data: json.legendData
    },
    polar: [
      {
        indicator: json.indicator
      }
    ],
    calculable: true,
    series: [
      {
        name: '部门资源',
        type: 'radar',
        data: json.radarData
      }
    ]
  };



  //{
  //  title: {
  //    text: '部门资源'
  //  },
  //  legend: {
  //    data: json.legendData
  //  },
  //  radar: {
  //    indicator: json.indicator
  //  },
  //  series: [
  //    {
  //      name: '部门资源',
  //      type: 'radar',
  //      data: json.radarData
  //    }
  //  ]
  //};

  //加载数据图表
  //console.log(json.radarData);
  if ($("#BackColorTransparent").is(":checked")) {
    lineoption.backgroundColor = "transparent";
  }
  lineChart.setOption(lineoption);
  $(window).resize(lineChart.resize);
}
