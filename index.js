import React, {
  useState,
  useCallback,
  useEffect,
} from 'react';
import ReactDOM from 'react-dom';
import { useData } from './useData';
import { AxisBottom } from './axisBottom';
import { AxisLeft } from './axisLeft';
import { Marks } from './Marks';
import {
  csv,
 
  scaleLinear,
  max,
  format,
  extent,
  scaleTime,
  timeFormat
} from 'd3';

const width = window.innerWidth;
const height = window.innerHeight;
const margin = {
  top: 20,
  bottom: 60,
  right: 30,
  left: 100,
};

const App = () => {
  const data = useData();
  if (!data) {
    return <pre>loading..</pre>;
  }
  const xValue = (d) => d.timestamp;
  const xAxisLabel = 'Time'
  
  const yValue = (d) => d.temperature;
    const yAxisLabel = 'Temperature'
  
  const innerHeight =
    height - margin.top - margin.bottom;
  const innerWidth =
    width - margin.right - margin.left;
  
    const xScale = scaleTime()
    .domain(extent(data,xValue))
    .range([0, innerWidth]).nice()
  
  const yScale = scaleLinear()
    .domain(extent(data,yValue))
    .range([innerHeight,0]).nice()
   



const xAxisTickFormat = timeFormat('%a')
const tooltipFormat = tickValue=>format(",.2r")(tickValue).replace('G','B')
 

return (
    <svg width={width} height={height}>
      <g
        transform={`translate(${margin.left},${margin.top})`}
      >
        <AxisBottom
          innerHeight={innerHeight}
          xScale={xScale}
          tickFormat={xAxisTickFormat}
        />
        <AxisLeft yScale={yScale} innerWidth={innerWidth}/>
        <text
          className="label"
          textAnchor="middle"
          x={innerWidth / 2}
          y={height - margin.bottom / 2}
        >
          {xAxisLabel}
        </text>
        <text
          className="label"
          textAnchor="middle"
          
          transform ={`translate(${-margin.left / 2},${innerHeight / 2}) rotate(-90)`}
        >
          {yAxisLabel}
        </text>
        <Marks
          data={data}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
          tooltipFormat={tooltipFormat}
          circleRadius={0}
        />
      </g>
    </svg>
  );
};

const rootElement = document.getElementById(
  'root'
);
ReactDOM.render(<App />, rootElement);
