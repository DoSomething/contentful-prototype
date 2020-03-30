import React from 'react';
import PropTypes from 'prop-types';
// import { css } from '@emotion/core';
// import classnames from 'classnames';

// Vertical
const ScholarshipFeatureBlock = ({ title, description, deadline, amount }) => {
  return (
    <div className="card rounded border-solid border-2 border-gray-300">
      <div className="flex flex-col h-full">
        <img
          className="pb-4"
          style={{ width: '100%' }}
          src="https://picsum.photos/384/216"
          alt="test"
        />
        <h4 className="px-4">
          <a
            className="text-blurple-500 hover:text-blurple-300"
            href="https://google.com"
          >
            {title}
          </a>
        </h4>
        <p className="px-4">{description}</p>
        <span className="px-4 text-sm text-gray-400">$$$$ from Taco Bell</span>
        <div className="px-4 pt-4">
          <div className="lg:float-left lg:pr-8">
            <h4 className="font-bold uppercase text-gray-600">Deadline</h4>
            <p className="pb-4">{deadline}</p>
          </div>
          <div className="lg:float-left">
            <h4 className="font-bold uppercase text-gray-600">Amount</h4>
            <p className="pb-4">{amount}</p>
          </div>
        </div>
        <button
          type="button"
          className="btn mx-4 mb-4 bg-blurple-500 text-white border border-solid border-blurple-500 hover:bg-blurple-300 hover:border-blurple-300 focus:bg-blurple-500 focus:text-white focus:outline-none"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

// Horizontal
// const ScholarshipFeatureBlock = ({ title, description, deadline, amount }) => {
//   return (
//     <div className="card rounded border-solid border-2 border-gray-300 flex flex-row items-stretch">
//       <div className="bg-gray-300 flex flex-column items-center">
//         <img className="p-4" src="https://picsum.photos/384/216" alt="test" />
//       </div>
//       <div className="p-4">
//         <h3>
//           <a href="https://google.com">{title}</a>
//         </h3>
//         <p className="">{description}</p>
//         <span className="pb-4 text-sm text-gray-400">$$$$ from Taco Bell</span>
//         <div className="pt-4">
//           <div className="lg:float-left lg:pr-8">
//             <h4 className="font-bold uppercase text-gray-600">Deadline</h4>
//             <p className="pb-4">{deadline}</p>
//           </div>
//           <div className="lg:float-left">
//             <h4 className="font-bold uppercase text-gray-600">Amount</h4>
//             <p className="pb-4">{amount}</p>
//           </div>
//         </div>
//         <button type="button" className="btn bg-blurple-500 clear-both block">
//           Apply Now
//         </button>
//       </div>
//     </div>
//   );
// };

ScholarshipFeatureBlock.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  deadline: PropTypes.string,
  amount: PropTypes.string,
};

ScholarshipFeatureBlock.defaultProps = {
  title: 'Would You Rather',
  description:
    'Take our Would You Rather-style quiz and and share a personal finance guide with a friend.',
  deadline: 'March 31, 2020',
  amount: '$2,500',
};

export default ScholarshipFeatureBlock;
