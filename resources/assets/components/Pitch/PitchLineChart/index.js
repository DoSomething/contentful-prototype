import React from 'react';
import PropTypes from 'prop-types';

import './pitchLineChart.scss';

const PitchLineChart = ({ color, dataset }) => {
  const data = dataset.data;

  const largestValue = data.reduce((largest, { value }) => (
    value > largest ? value : largest
  ), 0);

  const max = Math.ceil(largestValue / 100) * 100;

  const totalPoints = data.length;

  const xAxisHeight = 4;
  const yAxisWidth = 4;

  const chartWidth = 100 - yAxisWidth;
  const chartHeight = 100 - xAxisHeight;
  const columnWidth = chartWidth / (totalPoints * 2);

  const percentify = integer => `${integer}%`;

  const getPointX = index => ((columnWidth * index) * 2) + yAxisWidth;
  const getPointY = value => chartHeight - ((value / max) * 100);

  // TODO: Need a better way of positioning these for dynamic width
  //
  // const xAxisLabel = (
  //   <text
  //     x={percentify((chartWidth / 2) - yAxisWidth)}
  //     y={percentify(100)}
  //     textAnchor="middle"
  //     fill={color.secondary}
  //     className="-small"
  //   >{ meta.axis.x }</text>
  // );
  //
  // const yAxisLabel = (
  //   <text
  //     x={percentify(-45)}
  //     y={percentify(yAxisWidth / 2)}
  //     transform="rotate(270)"
  //     textAnchor="middle"
  //     fill={color.secondary}
  //     className="-small"
  //   >{ meta.axis.y }</text>
  // );

  const gridLines = [];

  for (let gridCol = 0; gridCol < totalPoints; gridCol += 1) {
    const gridX = percentify(getPointX(gridCol));

    gridLines.push(
      <line
        x1={gridX}
        y1={0}
        x2={gridX}
        y2={percentify(chartHeight)}
        stroke={color.secondary}
        key={`xline-${gridX}`}
      />,
    );

    gridLines.push(
      <text
        x={percentify(getPointX(gridCol) - (columnWidth / 3.5))}
        y={percentify(99)}
        color={color.secondary}
        key={`xline-label-${gridX}`}
      >{ data[gridCol].label }</text>,
    );
  }

  for (let gridRow = 0; gridRow <= max / 100; gridRow += 1) {
    const interval = gridRow * 100;
    const gridY = percentify(getPointY(interval));

    gridLines.push(
      <line
        x1={percentify(yAxisWidth)}
        y1={gridY}
        x2={percentify(chartWidth)}
        y2={gridY}
        stroke={color.secondary}
        key={`yline-${gridY}`}
      />,
    );

    if (gridRow === 0) continue; // eslint-disable-line no-continue

    gridLines.push(
      <text
        x={percentify(yAxisWidth - (`${interval}`.length * 0.75))}
        y={percentify(getPointY(interval) + 1)}
        stroke={color.primary}
        key={`yline-label-${gridY}`}
      >{ interval }</text>,
    );
  }

  const points = data.map(({ value }, index) => (
    <circle
      cx={percentify(getPointX(index))}
      cy={percentify(getPointY(value))}
      r={4}
      key={`point-${index}`} // eslint-disable-line react/no-array-index-key
    />
  ));

  const connections = data.map(({ value }, index) => {
    const lastIndex = Math.max(0, index - 1);
    const lastPoint = data[lastIndex];

    return (
      <line
        x1={percentify(getPointX(lastIndex))}
        y1={percentify(getPointY(lastPoint.value))}
        x2={percentify(getPointX(index))}
        y2={percentify(getPointY(value))}
        stroke={color.primary}
        key={`connection-${index}`} // eslint-disable-line react/no-array-index-key
      />
    );
  });

  return (
    <div className="pitch-line-chart">
      <svg width="100%" height="100%">
        { gridLines }
        { points }
        { connections }
      </svg>
    </div>
  );
};

PitchLineChart.propTypes = {
  color: PropTypes.shape({
    primary: PropTypes.string,
    secondary: PropTypes.string,
  }),
  dataset: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

PitchLineChart.defaultProps = {
  color: {
    primary: '#222',
    secondary: '#ddd',
  },
};

export default PitchLineChart;
