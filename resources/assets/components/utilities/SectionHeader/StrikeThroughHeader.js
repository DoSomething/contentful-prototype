import React from 'react';
import PropTypes from 'prop-types';

const StrikeThroughHeader = ({ title }) => (
  <div
    className="grid-wide flex flex-wrap md:flex-no-wrap text-center w-full mb-6 justify-center"
    data-testid="strike-through-header"
  >
    <div className="w-0 md:w-full md:flex-shrink my-auto">
      <div className=" bg-purple-500 h-1 w-full z-0" />
    </div>
    <h2 className="font-league-gothic font-normal leading-tight px-6 text-3xl md:text-4xl uppercase z-10 md:flex-shrink-0">
      {title}
    </h2>
    <div className="w-full md:flex-shrink my-auto">
      <div className=" bg-purple-500 h-1 w-full z-0" />
    </div>
  </div>
);

StrikeThroughHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default StrikeThroughHeader;
