import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import Card from '../Card';
import Gallery from '../Gallery';
import LoadMore from '../LoadMore';
import { ReportbackItem } from '../ReportbackItem';

const CampaignGalleryBlock = (props) => {
  const { loading, postsByCampaignId, loadMorePosts } = props;

  return loading ? (
    <div className="spinner -centered" />
  ) : (
    <div>
      <Gallery type="triad" className="expand-horizontal-md">
        {postsByCampaignId.map(post => (
          <Card className="rounded" key={post.id}>
            <ReportbackItem
              id={String(post.id)}
              type={post.type}
              caption={post.media.text}
              url={post.media.url}
              firstName={get(post, 'user.firstName') || 'A Doer'}
            />
          </Card>
        ))}
      </Gallery>
      { /* TODO: Use `networkStatus` to differentiate initial load from subsequent ones? (https://goo.gl/UnWbak) */ }
      <LoadMore className="padding-lg text-centered" text="view more" onClick={loadMorePosts} isLoading={false} />
    </div>
  );
};

CampaignGalleryBlock.propTypes = {
  postsByCampaignId: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  loading: PropTypes.bool.isRequired,
  loadMorePosts: PropTypes.func.isRequired,
};

CampaignGalleryBlock.defaultProps = {
  postsByCampaignId: [],
};

export default CampaignGalleryBlock;
