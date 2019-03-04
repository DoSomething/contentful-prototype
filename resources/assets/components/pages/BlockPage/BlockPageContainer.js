import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';

import BlockPage from './BlockPage';

// @TODO: Remove this component!
const BlockPageContainer = ({ match }) => <BlockPage id={match.params.id} />;

BlockPageContainer.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

export default BlockPageContainer;
