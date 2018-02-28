import PropTypes from 'prop-types';
import React from 'react';
import ContentfulEntry from '../ContentfulEntry';
import Enclosure from '../Enclosure';
import TabbedNavigationContainer from '../Navigation/TabbedNavigationContainer';

/**
 * Render the action page steps.
 *
 * @returns {XML}
 */
const ActivityFeedBlock = ({ json }) => (
  <div className="main clearfix">
    <TabbedNavigationContainer />
    <Enclosure className="default-container margin-top-lg margin-bottom-lg">
      <ContentfulEntry json={json} />
    </Enclosure>
  </div>
);

ActivityFeedBlock.propTypes = {
  json: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default ActivityFeedBlock;
