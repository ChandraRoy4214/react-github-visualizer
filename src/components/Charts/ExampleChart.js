// Include react
import React from "react";

// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Include the chart type
import Pie3D from "fusioncharts/fusioncharts.charts";

// Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Pie3D, FusionTheme);

const ExampleChart = ({data}) => {
  const chartConfigs = {
  type: "Pie3D", 
  width: "400", 
  height: "400",
  dataFormat: "json", 
  dataSource: {
    // Chart Configuration
    chart: {
    caption : "Languages",
    theme : "fusion",
    decimals : 0,
    pieRadius : "39%",
    },
    data,
  }
};

  return <ReactFC {...chartConfigs} />;
}

export default ExampleChart;