import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

export const ActionStatsBlockFragment = gql`
  fragment ActionStatsBlockFragment on ActionStatsBlock {
    actionId
  }
`;

const ActionStatsBlock = ({ actionId }) => (
  <>
    <h1>{actionId}</h1>
  </>
);

ActionStatsBlock.propTypes = {
  actionId: PropTypes.number.isRequired,
};

export default ActionStatsBlock;
