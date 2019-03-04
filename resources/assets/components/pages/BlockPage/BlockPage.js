import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';

import Enclosure from '../../Enclosure';
import ContentfulEntryLoader from '../../utilities/ContentfulEntryLoader/ContentfulEntryLoader';

/**
 * Render the block page.
 *
 * @returns {ReactElement}
 */
const BlockPage = ({ match }) => (
  <div className="main clearfix">
    <Enclosure className="default-container margin-top-lg margin-bottom-lg">
      <ContentfulEntryLoader id={match.params.id} />
    </Enclosure>
  </div>
);

BlockPage.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

export default BlockPage;
