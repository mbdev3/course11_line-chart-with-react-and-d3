import { line ,curveNatural} from 'd3';
export const Marks = ({
  data,
  yScale,
  xScale,
  xValue,
  yValue,
  tooltipFormat,
  circleRadius,
}) => (
  <g  className="mark">
    <path
     
      fill="none"
      stroke="black"
      d={line()
        .x((d) => xScale(xValue(d)))
        .y((d) => yScale(yValue(d))).curve(curveNatural)(data)}
    />
    {data.map((d) => 
      
      <circle
      
        cx={xScale(xValue(d))}
        cy={yScale(yValue(d))}
        r={circleRadius}
      >
        <title>{tooltipFormat(xValue(d))}</title>
      </circle>
   
    )}
  </g>
);
