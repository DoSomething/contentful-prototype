import React from 'react';
import PropTypes from 'prop-types';

import Card from '../../Card';
import Gallery from '../Gallery';
import { ReportbackItem } from '../../ReportbackItem';

const PostGallery = (props) => {
  const { loading, postsByCampaignId } = props.data;

  return loading ? (
    <div className="spinner -centered" />
  ) : (
    <div>
      <Gallery type="triad" className="expand-horizontal-md">
        {postsByCampaignId.map(post => (
          <Card className="rounded" key={post.id}>
            <ReportbackItem
              id={String(post.id)}
              caption={post.media.text}
              url={post.media.url}
              firstName={post.user.firstName}
            />
          </Card>
        ))}
      </Gallery>
    </div>
  );
};

PostGallery.propTypes = {
  data: PropTypes.shape({
    postsByCampaignId: PropTypes.array, // eslint-disable-line react/forbid-prop-types
    loading: PropTypes.bool.isRequired,
  }).isRequired,
};

export default PostGallery;
