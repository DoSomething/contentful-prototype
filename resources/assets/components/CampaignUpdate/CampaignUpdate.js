import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { get } from 'lodash';

import Card from '../utilities/Card/Card';
import Embed from '../utilities/Embed/Embed';
// @see line 82 *1
// import Share from '../utilities/Share/Share';
import Byline from '../utilities/Byline/Byline';
import SponsorPromotion from '../SponsorPromotion';
import Markdown from '../utilities/Markdown/Markdown';

const CampaignUpdate = props => {
  const {
    affiliateLogo,
    author,
    id,
    closeModal,
    content,
    link,
    bordered,
    // @see line 82 *1
    // shareLink,
    // titleLink,
  } = props;

  const authorFields = get(author, 'fields', {});

  const isTweet = content && content.length < 144;

  // The affiliate logo specific text is hardcoded for OZY
  // @TODO Make this a Contentful field?
  const title = affiliateLogo ? 'See More Be More Do More' : 'Campaign Update';

  return (
    <Card
      id={id}
      className={classnames('rounded', {
        bordered,
        'affiliate-content': affiliateLogo,
      })}
      // @see line 82 *1
      // link={titleLink}
      title={title}
      onClose={closeModal}
    >
      <Markdown className={classnames('padded', { 'font-size-lg': isTweet })}>
        {content || 'Placeholder'}
      </Markdown>

      {link ? (
        <div className="padded">
          <Embed url={link} />
        </div>
      ) : null}

      <footer className="padded clearfix">
        {affiliateLogo ? (
          <SponsorPromotion className="affiliate-logo" imgUrl={affiliateLogo} />
        ) : (
          <Byline
            author={authorFields.name}
            avatar={authorFields.avatar || undefined}
            jobTitle={authorFields.jobTitle || undefined}
            className="float-left"
          />
        )}
        {/* @see line 82 *1
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
// Temporarily sunsetting sharing and linking since
// moving campaign updates from `activity_feed` to page removes the entry as a direct descendent of
// the campaigns, thus disabling our helpers#findContentfulEntry from finding it for rendering.
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
