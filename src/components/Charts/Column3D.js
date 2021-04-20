// Include react
import React from "react";

// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Include the chart type
import Chart from "fusioncharts/fusioncharts.charts";

// Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

const Doughnut2d = ({data}) => {
  
  const chartConfigs = {
  type: "column3d", 
  width: "100%", 
  height: "400",
  dataFormat: "json", 
  dataSource: {
    // Chart Configuration
    chart: {
    caption : "Most Popular",
    yAxisName : "Stars",
    xAxisName : "Repos",
    xAxisNameFontSize : "16px",
    yAxisNameFontSize : "16px",
    
    },
    data,
  }
};

  return <ReactFC {...chartConfigs} />;
}

export default Doughnut2d;