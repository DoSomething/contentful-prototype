import PropTypes from 'prop-types';
import React from 'react';

import Enclosure from '../../Enclosure';
import ContentfulEntryLoader from '../../utilities/ContentfulEntryLoader/ContentfulEntryLoader';

/**
 * Render the block page.
 *
 * @returns {ReactElement}
 */
const BlockPage = ({ id }) => (
  <div className="main clearfix">
    <Enclosure className="default-container margin-top-lg margin-bottom-lg">
      <ContentfulEntryLoader id={id} />
    </Enclosure>
  </div>
);

BlockPage.propTypes = {
  id: PropTypes.string.isRequired,
};

export default BlockPage;
