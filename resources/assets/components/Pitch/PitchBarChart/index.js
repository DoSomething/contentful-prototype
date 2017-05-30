import React from 'react';
import PropTypes from 'prop-types';

import './pitchBarChart.scss';

const PitchBarChart = ({ foreground, background, dataset }) => {
  const { meta, data } = dataset;

  const maxValue = data.reduce((largest, { value }) => (
    value > largest ? value : largest
  ), 0);
  const maxBuffer = maxValue * 0.25;

  const titlePosition = 3;
  const titleBuffer = titlePosition + 2;

  const chartHeight = 100 - titleBuffer;

  const totalBars = data.length;
  const barHeight = chartHeight / (totalBars * 2); // Make sure we can evenly space the bars.

  const percentify = integer => `${integer}%`;
  const getBarY = index => ((barHeight * index) * 2) + titleBuffer;
  const getBarWidth = value => (value / (maxValue + maxBuffer)) * 100;

  return (
    <div className="pitch-bar-chart">
      <svg width="100%" height="100%">
        <text
          x={percentify(45)}
          y={percentify(titlePosition)}
          textAnchor="middle"
          fill={foreground}
        >{ meta.title }</text>

        {data.map(({ value, label }, index) => (
          <g key={label}>
            <rect
              x={0}
              y={percentify(getBarY(index))}
              height={percentify(barHeight)}
              width={percentify(getBarWidth(value))}
              fill={foreground}
            />
            <text
              x={percentify(0.5)}
              y={percentify(getBarY(index) + (barHeight / 1.5))}
              fill={background}
            >{ label }</text>
            <text
              className="-bold"
              x={percentify(getBarWidth(value) + 0.75)}
              y={percentify(getBarY(index) + (barHeight / 1.5))}
              fill={foreground}
            >{ value }</text>
          </g>
        ))}
      </svg>
    </div>
  );
};

PitchBarChart.propTypes = {
  foreground: PropTypes.string,
  background: PropTypes.string,
  dataset: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

PitchBarChart.defaultProps = {
  foreground: '#FFF',
  background: '#111',
};

export default PitchBarChart;
