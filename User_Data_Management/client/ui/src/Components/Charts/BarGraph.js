import React, { useState, useEffect, useLayoutEffect, useContext } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";
import { DrillDownGraphContext, FiltersContext } from "../../Context/Provider";
import { Button } from "@mui/material";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

// [{"country":"country_name", "value": 9}]
const BarGraph = ({ id, data, title }) => {
  const [graphData, setGraphData] = useState([]);
  const { drillDownState, locationBarGraphFilterHandler } = useContext(DrillDownGraphContext);

  useEffect(() => {
    setGraphData(data);
  }, [data]);

  useLayoutEffect(() => {
    // Create root element
    let root = am5.Root.new(id);

    // Set themes
    root.setThemes([am5themes_Responsive.new(root)]);

    // Create chart
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        layout: root.verticalLayout,
        x: am5.percent(0),
        y: am5.percent(0),
        // y: am5.percent(20),
        marginBottom: "20px",
        // pinchZoomX: true,
      })
    );

    // Add cursor
    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineX.set("visible", false);
    cursor.lineY.set("visible", false);

    // Create axes
    let xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
    xRenderer.labels.template.setAll({
      rotation: 0,
      centerY: am5.p50,
      centerX: am5.p50,
      paddingRight: 15,
      marginBottom: 20,
      maxWidth: 200,
      oversizedBehavior: "wrap",
      textAlign: "center",
    });
    xRenderer.grid.template.set("visible", false);
    xRenderer.grid.template.setAll({
      location: 1,
    });

    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0.3,
        categoryField: "country",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0.3,
        renderer: am5xy.AxisRendererY.new(root, {
          strokeOpacity: 0.1,
          visible: true,
        }),
      })
    );

    // Create series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    let series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Series 1",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        sequencedInterpolation: true,
        categoryXField: "country",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}",
        }),
      })
    );

    series.columns.template.setAll({
      cornerRadiusTL: 5,
      cornerRadiusTR: 5,
      strokeOpacity: 0,
    });
    series.columns.template.adapters.add("fill", function (fill, target) {
      return chart.get("colors").getIndex(series.columns.indexOf(target));
    });

    series.columns.template.adapters.add("stroke", function (stroke, target) {
      return chart.get("colors").getIndex(series.columns.indexOf(target));
    });

    xAxis?.data?.setAll(graphData);
    series?.data?.setAll(graphData);

    chart.children.unshift(
      am5.Label.new(root, {
        text: title,
        x: am5.percent(20),
        centerX: am5.percent(50),
        paddingTop: -8,
        paddingBottom: 20,
      })
    );

    // Function to return name of the country bar clicked
    // series.columns.template.events.on("click", function(ev){
    //   locationBarGraphFilterHandler({...drillDownState, locationBarGraphFilter:ev?.target?._dataItem?.dataContext?.country, showCountryGraph:false});
    // })

    // Make stuff animate on load
    series.appear(1000);
    chart.appear(1000, 100);

    // Remove amcharts logo
    root._logo.dispose();

    return () => {
      root.dispose();
    };
  }, [graphData, id]);

  const handleButtonClick = (e) => {
    console.log("CLICKED")
    locationBarGraphFilterHandler({ ...drillDownState, showCountryGraph: true })
  }

  return (
    <div
      id={id}
      style={{
        width: "100%",
        height: "40vh",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "5px 5px 2px #ccc",
        marginTop: "20px",
        backgroundColor: "#fff",
        position: 'relative'
      }}
    >
      {id === "BarGraph_state" && <Button onClick={(e) =>locationBarGraphFilterHandler({...drillDownState, showCountryGraph:true})} style={{ position: 'absolute', right: '0', cursor: 'pointer', zIndex:"100" }}><KeyboardBackspaceIcon />Country Graph</Button>}
    </div>
  );
};

export default BarGraph;
