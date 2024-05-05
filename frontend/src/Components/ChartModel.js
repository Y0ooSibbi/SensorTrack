import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import "./ChartModel.css";

function LineChart({ chartData }) {
  return (
    <div className="chart-container">
      <Chart
        options={{
          ...chartData.options,
          dataLabels: { enabled: false }, // Disable data labels
          chart: { toolbar: { show: true } }, // Hide toolbar
        }}
        series={chartData.series}
        type="line"
        width="100%"
        height="100%"
      />
    </div>
  );
}

function BarChart({ chartData }) {
  return (
    <div className="chart-container">
      <Chart
        options={{
          ...chartData.options,
          plotOptions: {
            bar: {
              dataLabels: {
                enabled: false, // Disable data labels on bars
              },
            },
          },
          dataLabels: { enabled: false }, // Disable data labels
          chart: { toolbar: { show: true } }, // Hide toolbar
        }}
        series={chartData.series}
        type="bar"
        width="100%"
        height="100%"
      />
    </div>
  );
}

function AreaChart({ chartData }) {
  return (
    <div className="chart-container">
      <Chart
        options={{
          ...chartData.options,
          dataLabels: { enabled: false }, // Disable data labels
          chart: { toolbar: { show: true } }, // Hide toolbar
        }}
        series={chartData.series}
        type="area"
        width="100%"
        height="100%" // Adjusted height for the area chart
      />
    </div>
  );
}

function RadarChart({ chartData }) {
  return (
    <div className="chart-container">
      <Chart
        options={{
          ...chartData.options,
          dataLabels: { enabled: false }, // Disable data labels
          chart: { toolbar: { show: true } }, // Hide toolbar
        }}
        series={chartData.series}
        type="radar"
        width="100%"
        height="100%" // Adjusted height for the radar chart
      />
    </div>
  );
}

function HistogramChart({ chartData }) {
  return (
    <div className="chart-container">
      <Chart
        options={{
          ...chartData.options,
          dataLabels: { enabled: false }, // Disable data labels
          chart: { toolbar: { show: true } }, // Hide toolbar
        }}
        series={chartData.series}
        type="histogram"
        width="100%"
        height="100%"
      />
    </div>
  );
}

function ScatterChart({ chartData }) {
  return (
    <div className="chart-container">
      <Chart
        options={{
          ...chartData.options,
          dataLabels: { enabled: false }, // Disable data labels
          chart: { toolbar: { show: true } }, // Hide toolbar
        }}
        series={chartData.series}
        type="scatter"
        width="100%"
        height="100%"
      />
    </div>
  );
}

function HeatmapChart({ chartData }) {
  return (
    <div className="chart-container">
      <Chart
        options={{
          ...chartData.options,
          dataLabels: { enabled: false }, // Disable data labels
          chart: { toolbar: { show: true } }, // Hide toolbar
        }}
        series={chartData.series}
        type="heatmap"
        width="100%"
        height="100%"
      />
    </div>
  );
}

function ChartModel() {
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: "basic-bar",
        width: "80%" // Set graph width to 80% of the screen
      },
      xaxis: {
        categories: [],
        labels: { show: true, style: { fontSize: '14px' }, },
        title: { text: 'Time in Hours', style: { fontSize: '16px' } }, // Adding x-axis label
      },
      yaxis: {
        labels: { show: true, style: { fontSize: '14px' }, },
        title: { text: 'Y Axis Label', style: { fontSize: '16px' } }, // Adding y-axis label
      }
    },
    series: [
      {
        name: "Temperature",
        data: [],
      },
      {
        name: "Humidity",
        data: [],
      },
    ],
  });

  const [chartType, setChartType] = useState("line");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/graphs/6074fb3275a63e1cc8a8e2ef"
        );
        console.log(response);
        const data = response.data[18]; // Get the response data

        // Extracting data from the fetched objecta
        const categories = data.options.xaxis.categories;
        const temperatureData = data.series.find(
          (series) => series.name === "Temperature" 
        ).data;
        const humidityData = data.series.find(
          (series) => series.name === "Humidity"
        ).data;

        setChartData({
          ...chartData,
          options: {
            ...chartData.options,
            xaxis: {
              ...chartData.options.xaxis,
              categories: categories,
            },
          },
          series: [
            {
              ...chartData.series[0],
              data: temperatureData,
            },
            {
              ...chartData.series[1],
              data: humidityData,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChartTypeChange = (type) => {
    setChartType(type);
  };

  return (
    <div className="ChartModel">
        <h1>Sensor Data</h1>
        <div className="row">
            <div className="col">
                {chartType === "line" && <LineChart chartData={chartData} />}
                {chartType === "bar" && <BarChart chartData={chartData} />}
                {chartType === "area" && <AreaChart chartData={chartData} />}
                {chartType === "radar" && <RadarChart chartData={chartData} />}
                {chartType === "histogram" && <HistogramChart chartData={chartData} />}
                {chartType === "scatter" && <ScatterChart chartData={chartData} />}
                {chartType === "heatmap" && <HeatmapChart chartData={chartData} />}
            </div>
            <div className="col mt-4">
                <label htmlFor="chartType">Select Chart Type: </label>
                <select
                    id="chartType"
                    value={chartType}
                    onChange={(e) => handleChartTypeChange(e.target.value)}
                >
                    <option value="line">Line Chart</option>
                    <option value="bar">Bar Chart</option>
                    <option value="area">Area Chart</option>
                    <option value="radar">Radar Chart</option>
                    <option value="histogram">Histogram Chart</option>
                    <option value="scatter">Scatter Chart</option>
                    <option value="heatmap">Heatmap Chart</option>
                </select>
            </div>
        </div>
    </div>
);
}

export default ChartModel;
