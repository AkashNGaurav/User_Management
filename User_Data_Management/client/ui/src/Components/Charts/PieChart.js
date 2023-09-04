import React, { useState, useLayoutEffect, useEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";

const PieChart = ({ data, id, title }) => {
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    setGraphData(data);
  }, [data]);

  useLayoutEffect(() => {
    // Create root element
    var root = am5.Root.new(id);

    // Set themes
    root.setThemes([am5themes_Responsive.new(root)]);

    // Create chart
    var chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
        x: am5.percent(0),
        // layout: root.GridLayout,
        radius: am5.percent(80),
        innerRadius: am5.percent(40),
        // innerRadius: 0,
        endAngle: 270,
      })
    );

    // Create series
    var series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: "value",
        categoryField: "category",
        // alignLabels: false,
        endAngle: 270,
      })
    );

    // series.labels.template.setAll({
    //   textType: "circular",
    // });

    series.states.create("hidden", {
      endAngle: -90,
    });

    // Processor needs to be set before data
    series.data.processor = am5.DataProcessor.new(root, {
      emptyAs: 0,
    });

    // Set data
    series.data.setAll(graphData);

    //Create Legend
    var legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        centerY: am5.percent(50),
        y: am5.percent(80),
        layout: root.verticalLayout,
        height: am5.percent(65),
        width: am5.percent(90),
        // marginBottom: "20px",
        verticalScrollbar: am5.Scrollbar.new(root, {
          orientation: "vertical",
        }),
      })
    );

    legend.data.setAll(series.dataItems);

    chart.children.unshift(
      am5.Label.new(root, {
        text: title,
      })
    );

    series.ticks.template.set("visible", false);

    series.labels.template.setAll({
      maxWidth: 1,
      oversizedBehavior: "hide", // to truncate labels, use "truncate"
    });

    legend.labels.template.setAll({
      fontSize: 12,
      fontWeight: "300",
    });

    legend.valueLabels.template.setAll({
      fontSize: 12,
      fontWeight: "300",
    });

    series.appear(1000, 100);

    // Remove amcharts logo
    root._logo.dispose();

    return () => {
      if (root) {
        root.dispose();
      }
    };
  }, [graphData, id]);

  return (
    <div
      id={id}
      style={{
        width: "100%",
        height: "32vh",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "5px 5px 2px #ccc",
        marginTop: "20px",
        backgroundColor: "#fff",
      }}
    ></div>
  );
};

export default PieChart;
