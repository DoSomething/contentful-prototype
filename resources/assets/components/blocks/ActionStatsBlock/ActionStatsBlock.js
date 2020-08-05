import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

export const ActionStatsBlockFragment = gql`
  fragment ActionStatsBlockFragment on ActionStatsBlock {
    filterByActionId: actionId
  }
`;

const ActionStatsBlock = ({ filterByActionId }) => (
  <>
    <h1>{filterByActionId}</h1>
  </>
);

ActionStatsBlock.propTypes = {
  filterByActionId: PropTypes.number.isRequired,
};

export default ActionStatsBlock;
