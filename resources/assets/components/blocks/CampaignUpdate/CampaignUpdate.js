import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { get } from 'lodash';

import Card from '../../utilities/Card/Card';
import Embed from '../../utilities/Embed/Embed';
// @see line 81 *1
// import Share from '../../utilities/Share/Share';
import Byline from '../../utilities/Byline/Byline';
import { contentfulImageUrl } from '../../../helpers';
import TextContent from '../../utilities/TextContent/TextContent';
import AffiliatePromotion from '../../utilities/AffiliatePromotion/AffiliatePromotion';

export const CampaignUpdateBlockFragment = gql`
  fragment CampaignUpdateBlockFragment on CampaignUpdateBlock {
    id
    content
    link
    author {
      name
      jobTitle
      photo {
        url
      }
    }
    affiliateLogo {
      url
    }
  }
`;

const CampaignUpdate = props => {
  const {
    affiliateLogo,
    author,
    id,
    closeModal,
    content,
    link,
    bordered,
    // @see line 81 *1
    // shareLink,
    // titleLink,
  } = props;

  // Support both GraphQL & PHP Content API formats:
  const authorFields = author && author.fields ? author.fields : author;
  const authorPhoto = get(authorFields, 'photo.url') || undefined;

  const isTweet = content && content.length < 144;

  return (
    <Card
      id={id}
      className={classnames('rounded', { bordered })}
      // @see line 81 *1
      // link={titleLink}
      title="Campaign Update"
      onClose={closeModal}
    >
      <TextContent className={classnames('p-3', { 'text-xl': isTweet })}>
        {content || 'Placeholder'}
      </TextContent>

      {link ? (
        <div className="p-3">
          <Embed url={link} />
        </div>
      ) : null}

      <footer className="p-3 clearfix">
        {affiliateLogo ? (
          <AffiliatePromotion
            imgUrl={affiliateLogo}
            textClassName="text-gray-600"
          />
        ) : (
          <Byline
            author={authorFields.name}
            photo={
              authorPhoto
                ? contentfulImageUrl(authorPhoto, 175, 175, 'fill')
                : undefined
            }
            jobTitle={authorFields.jobTitle || undefined}
            className="float-left"
          />
        )}
        {/* @see line 81 *1
          <Share
            link={shareLink}
            variant="icon"
            parentSource="campaignUpdate"
            className="clear-none -right-icon"
          /> */}
      </footer>
    </Card>
  );
};

// *1:
// Temporarily sunsetting sharing and title links due to affects of running
// /content/management-api-scripts/2018_04_20_001_campaign_activity_feed_to_community_page
// (Moving Campaign##activity_feed blocks to a Page prevents us from finding and displaying the entries locally
// at the /block and /modal routes)
// @todo implement routing for individual entries.

CampaignUpdate.propTypes = {
  id: PropTypes.string.isRequired,
  affiliateLogo: PropTypes.string,
  author: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    fields: PropTypes.object,
  }),
  closeModal: PropTypes.func,
  content: PropTypes.string,
  link: PropTypes.string,
  // @see line 81 *1
  // shareLink: PropTypes.string.isRequired,
  // titleLink: PropTypes.string.isRequired,
  bordered: PropTypes.bool,
};

CampaignUpdate.defaultProps = {
  affiliateLogo: null,
  link: null,
  bordered: true,
  author: null,
  content: null,
  closeModal: null,
};

export default CampaignUpdate;
