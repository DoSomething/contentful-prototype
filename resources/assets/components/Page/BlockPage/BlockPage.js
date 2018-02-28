import PropTypes from 'prop-types';
import React from 'react';
import Enclosure from '../../Enclosure';
import ContentfulEntry from '../../ContentfulEntry';
import TabbedNavigationContainer from '../../Navigation/TabbedNavigationContainer';

/**
 * Render the block page.
 *
 * @returns {XML}
 */
const BlockPage = ({ json }) => (
  <div className="main clearfix">
    <TabbedNavigationContainer />
    <Enclosure className="default-container margin-top-lg margin-bottom-lg">
      <ContentfulEntry json={json} />
    </Enclosure>
  </div>
);

BlockPage.propTypes = {
  json: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default BlockPage;
