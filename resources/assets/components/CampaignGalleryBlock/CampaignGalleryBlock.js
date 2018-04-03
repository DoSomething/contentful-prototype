import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import Card from '../Card';
import Gallery from '../Gallery';
import LoadMore from '../LoadMore';
import PostCard from '../PostCard/PostCard';

const CampaignGalleryBlock = (props) => {
  const { loading, postsByCampaignId, loadMorePosts } = props;

  return (
    <div>
      <Gallery type="triad" className="expand-horizontal-md">
        {postsByCampaignId.map(post => (
          <Card className="rounded" key={post.id}>
              id={String(post.id)}
              type={post.type}
              firstName={get(post, 'user.firstName') || 'A Doer'}
              reactions={post.reactions}
              reacted={post.reacted}
              text={post.text}
              url={post.url}
            />
            <PostCard
          </Card>
        ))}
      </Gallery>
      <LoadMore className="padding-lg text-centered" text="view more" onClick={loadMorePosts} isLoading={loading} />
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
