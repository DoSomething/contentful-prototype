import React from 'react';
import Media from 'react-media';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import LazyImage from '../LazyImage';
import AnalyticsWaypoint from '../AnalyticsWaypoint/AnalyticsWaypoint';

const IframeEmbed = ({ className, id, url, previewImage }) => {
  const iframeElement = () => (
    <iframe title={`embed ${id}`} src={url} width="100%" height="520" />
  );

  return (
    <div id={id} className={classnames('embed', className)}>
      <AnalyticsWaypoint name="embed-top" context={{ blockId: id }} />

      {previewImage ? (
        <Media query="(max-width: 759px)">
          {matches =>
            matches ? (
              <LazyImage
                className="rounded overflow-hidden"
                src={previewImage.url}
                alt={
                  previewImage.description ||
                  'Preview image for embedded content'
                }
              />
            ) : (
              iframeElement()
            )
          }
        </Media>
      ) : (
        iframeElement()
      )}

      <AnalyticsWaypoint name="embed-bottom" context={{ blockId: id }} />
    </div>
  );
};

IframeEmbed.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  previewImage: PropTypes.shape({
    url: PropTypes.string.isRequired,
    description: PropTypes.string,
  }),
};

IframeEmbed.defaultProps = {
  className: null,
  previewImage: null,
};

export default IframeEmbed;
