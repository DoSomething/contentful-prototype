import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Card from '../../../utilities/Card/Card';
import Embed from '../../../utilities/Embed/Embed';
import { dynamicString } from '../../../../helpers';
import ButtonLink from '../../../utilities/ButtonLink/ButtonLink';
import { trackAnalyticsEvent } from '../../../../helpers/analytics';
import TextContent from '../../../utilities/TextContent/TextContent';
import AffiliatePromotion from '../../../utilities/AffiliatePromotion/AffiliatePromotion';

const analyzeClick = (link, context) => {
  trackAnalyticsEvent('clicked_link_action', {
    action: 'button_clicked',
    category: 'campaign_action',
    label: 'link_action',
    context: { ...context, url: link },
  });
};

const DefaultTemplate = props => {
  const {
    affiliateLogo,
    buttonText,
    campaignId,
    content,
    id,
    link,
    pageId,
    source,
    userId,
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

  const context = { blockId: id, campaignId, pageId };

  // If no content is provided, show as an embed.
  if (!content) {
    return (
      <div
        role="button"
        tabIndex="0"
        onClick={() => analyzeClick(href, context)}
        className="link-wrapper"
      >
        <Embed url={link} badged />
        {affiliateLogo ? (
          <AffiliatePromotion
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
        className={classnames('bordered rounded', {
          'affiliate-content': affiliateLogo,
        })}
      >
        {content ? <TextContent className="p-3">{content}</TextContent> : null}

        {affiliateLogo ? (
          <AffiliatePromotion
            className="text-black p-3"
            imgUrl={affiliateLogo.url}
            title={affiliateLogo.description}
          />
        ) : null}

        <ButtonLink
          attached
          link={href}
          onClick={() => analyzeClick(href, context)}
        >
          {buttonText}
        </ButtonLink>
      </Card>
    </div>
  );
};

DefaultTemplate.propTypes = {
  affiliateLogo: PropTypes.shape({
    url: PropTypes.string,
    description: PropTypes.string,
  }),
  buttonText: PropTypes.string,
  campaignId: PropTypes.string,
  content: PropTypes.string,
  id: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  pageId: PropTypes.string,
  source: PropTypes.string,
  title: PropTypes.string.isRequired,
  userId: PropTypes.string,
};

DefaultTemplate.defaultProps = {
  affiliateLogo: null,
  buttonText: 'Visit Link',
  campaignId: null,
  content: null,
  pageId: null,
  source: 'web',
  userId: null,
};

export default DefaultTemplate;
