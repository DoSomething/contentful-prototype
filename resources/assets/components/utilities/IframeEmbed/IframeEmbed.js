import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import AnalyticsWaypoint from '../AnalyticsWaypoint/AnalyticsWaypoint';

const IframeEmbed = ({ className, id, url }) => (
  <div
    id={id}
    className={classnames('embed', className)}
    data-testid="iframe-embed"
  >
    <AnalyticsWaypoint name="embed-top" context={{ blockId: id }} />

    <iframe title={`embed ${id}`} src={url} width="100%" height="520" />

    <AnalyticsWaypoint name="embed-bottom" context={{ blockId: id }} />
  </div>
);

IframeEmbed.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

IframeEmbed.defaultProps = {
  className: null,
};

export default IframeEmbed;
