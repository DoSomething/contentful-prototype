import React from 'react';
import PropTypes from 'prop-types';
// import { css } from '@emotion/core';
// import classnames from 'classnames';

// Vertical
const ScholarshipFeatureBlock = ({
  title,
  description,
  deadline,
  amount,
  staffPick,
}) => {
  return (
    <article className="flex flex-col h-full relative text-left">
      <img
        style={{ width: '100%' }}
        src="https://picsum.photos/384/216"
        alt="test"
      />
      <div className="bg-white border-b border-l border-r border-gray-300 border-solid flex flex-col flex-grow p-4 rounded-b">
        {staffPick ? (
          <div className="absolute bg-purple-500 font-bold px-3 py-1 right-0 text-base text-white top-0 uppercase">
            Featured
          </div>
        ) : null}

        <div className="absolute bg-purple-500 font-bold px-3 py-1 right-0 text-base text-white top-0 uppercase">
          Featured
        </div>
        <h4>
          <a
            className="text-blurple-500 hover:text-blurple-300"
            href="https://google.com"
          >
            {title}
          </a>
        </h4>
        <p className="flex-grow">{description}</p>
        {/* <span className="pt-2 text-sm text-gray-500">
          Provided by DoSomething.org
        </span> */}
        <div className="pt-4">
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
          className="btn bg-blurple-500 border border-solid border-blurple-500 hover:bg-blurple-300 hover:border-blurple-300 focus:bg-blurple-500 focus:text-white focus:outline-none"
        >
          Apply Now
        </button>
      </div>
    </article>
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
  staffPick: PropTypes.bool.isRequired,
};

ScholarshipFeatureBlock.defaultProps = {
  title: 'Would You Rather',
  description:
    'Take our Would You Rather-style quiz and and share a personal finance guide with a friend.',
  deadline: 'March 31, 2020',
  amount: '$2,500',
};

export default ScholarshipFeatureBlock;
