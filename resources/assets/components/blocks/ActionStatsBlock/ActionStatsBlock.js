import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import ActionStatsTable from './ActionStatsTable';

export const ActionStatsBlockFragment = gql`
  fragment ActionStatsBlockFragment on ActionStatsBlock {
    filterByActionId: actionId
  }
`;

const ActionStatsBlock = ({ filterByActionId }) => (
  <>
    <ActionStatsTable actionId={1} />
  </>
);

ActionStatsBlock.propTypes = {
  filterByActionId: PropTypes.number.isRequired,
};

export default ActionStatsBlock;
