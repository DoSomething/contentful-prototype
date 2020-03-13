import React from 'react';
import tw from 'twin.macro';
import PropTypes from 'prop-types';

const GeneralPage = ({ children }) => (
  <div css={tw`grid grid-cols-12 bg-gray-100 gap-3 px-12 py-6`}>
    <div css={tw`col-start-3 col-span-8 my-6`}>{children}</div>
  </div>
);

GeneralPage.propTypes = {
  children: PropTypes.node,
};

GeneralPage.defaultProps = {
  children: null,
};

export default GeneralPage;
