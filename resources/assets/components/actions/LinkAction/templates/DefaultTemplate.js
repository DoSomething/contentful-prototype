/* global window */

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Card from '../../../utilities/Card/Card';
import Embed from '../../../utilities/Embed/Embed';
import Button from '../../../utilities/Button/Button';
import SponsorPromotion from '../../../SponsorPromotion';
import { isExternal, dynamicString } from '../../../../helpers';
import { trackAnalyticsEvent } from '../../../../helpers/analytics';
import TextContent from '../../../utilities/TextContent/TextContent';

const onLinkClick = link => {
  window.open(link, isExternal(link) ? '_blank' : '_self');
  trackAnalyticsEvent({
    verb: 'clicked',
    noun: 'link_action',
    data: { link },
  });
};

const DefaultTemplate = props => {
  const {
    content,
    link,
    userId,
    campaignId,
    buttonText,
    affiliateLogo,
    source,
  } = props;

  // The affiliate logo specific text is hard-coded for OZY. Though we can set this title
  // in Contentful, we currently can't for CampaignUpdates which have a similar affiliate flow,
  // so this ensures consistency until we make this part of the content editing process.
  const title = affiliateLogo ? 'See More Be More Do More' : props.title;

  const href = dynamicString(link, {
    userId,
    northstarId: userId, // @TODO: Remove!
    campaignId,
    campaignRunId: 0,
    source,
  });

  // If no content is provided, show as an embed.
  if (!content) {
    return (
      <div
        role="button"
        tabIndex="0"
        onClick={() => onLinkClick(href)}
        className="link-wrapper margin-bottom-lg"
      >
        <Embed url={link} badged />
        {affiliateLogo ? (
          <SponsorPromotion
            className="affiliate-logo -padded"
            imgUrl={affiliateLogo.url}
            title={affiliateLogo.description}
          />
        ) : null}
      </div>
    );
  }

  return (
    <div className="link-action">
      <Card
        title={title}
        className={classnames('rounded bordered', {
          'affiliate-content': affiliateLogo,
        })}
      >
        {content ? (
          <TextContent className="padded">{content}</TextContent>
        ) : null}

        {affiliateLogo ? (
          <SponsorPromotion
            className="affiliate-logo -padded"
            imgUrl={affiliateLogo.url}
            title={affiliateLogo.description}
          />
        ) : null}

        <Button attached onClick={() => onLinkClick(href)}>
          {buttonText}
        </Button>
      </Card>
    </div>
  );
};

DefaultTemplate.defaultProps = {
  content: null,
  affiliateLogo: null,
  buttonText: 'Visit Link',
  campaignId: null,
  userId: null,
  source: 'web',
};

DefaultTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  link: PropTypes.string.isRequired,
  affiliateLogo: PropTypes.shape({
    url: PropTypes.string,
    description: PropTypes.string,
  }),
  buttonText: PropTypes.string,
  campaignId: PropTypes.string,
  userId: PropTypes.string,
  source: PropTypes.string,
};

export default DefaultTemplate;
