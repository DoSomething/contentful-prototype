import React from 'react';
import PropTypes from 'prop-types';

const ScholarshipInstructions = ({ numberOfScholarships, endDate }) => (
  <div className="lg:w-1/2 lg:float-right lg:pl-6">
    <h4 className="font-bold uppercase text-gray-600">HOW IT WORKS</h4>
    <div className="mt-2 pb-2">
      {numberOfScholarships} scholarship{numberOfScholarships > 1 ? 's' : null}{' '}
      will be given out before {endDate}.{' '}
      <a
        href="https://help.dosomething.org/hc/en-us/categories/201026747-Scholarships"
        target="_blank"
        rel="noopener noreferrer"
        className="underline text-black font-normal"
      >
        Learn More
      </a>{' '}
    </div>
  </div>
);

ScholarshipInstructions.propTypes = {
  numberOfScholarships: PropTypes.number.isRequired,
  endDate: PropTypes.number.isRequired,
};
export default ScholarshipInstructions;
