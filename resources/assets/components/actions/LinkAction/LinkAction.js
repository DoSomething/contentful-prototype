/* global window */

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Embed from '../../Embed';
import Card from '../../utilities/Card/Card';
import Button from '../../utilities/Button/Button';
import SponsorPromotion from '../../SponsorPromotion';
import Markdown from '../../utilities/Markdown/Markdown';
import { trackPuckEvent } from '../../../helpers/analytics';
import { isExternal, dynamicString } from '../../../helpers';

const onLinkClick = link => {
  window.open(link, isExternal(link) ? '_blank' : '_self');
  trackPuckEvent('clicked link action', { link });
};

const LinkAction = props => {
  const {
    content,
    link,
    userId,
    campaignId,
    buttonText,
    affiliateLogo,
  } = props;

  // The affiliate logo specific text is hard-coded for OZY. Though we can set this title
  // in Contentful, we currently can't for CampaignUpdates which have a similar affiliate flow,
  // so this ensures consistency until we make this part of the content editing process.
  const title = affiliateLogo ? 'See More Be More Do More' : props.title;

  const href = dynamicString(link, { campaignId, userId });

  // If no button/content is provided, show plain embed.
  if (!content && !buttonText) {
    return (
      <div
        role="button"
        tabIndex="0"
        onClick={() => onLinkClick(link)}
        className="link-wrapper margin-bottom-lg"
      >
        <Embed url={href} />
      </div>
    );
  }

  return (
    <div className="link-action margin-bottom-lg">
      <Card
        title={title}
        className={classnames('rounded bordered', {
          'affiliate-content': affiliateLogo,
        })}
      >
        {content ? <Markdown className="padded">{content}</Markdown> : null}

        {buttonText ? null : (
          <div
            role="button"
            tabIndex="0"
            onClick={() => onLinkClick(link)}
            className="link-wrapper"
          >
            <Embed className="padded" url={href} />
          </div>
        )}

        {affiliateLogo ? (
          <SponsorPromotion
            className="affiliate-logo -padded"
            imgUrl={affiliateLogo}
          />
        ) : null}

        {buttonText ? (
          <Button attached onClick={() => onLinkClick(link)}>
            {buttonText}
          </Button>
        ) : null}
      </Card>
    </div>
  );
};

LinkAction.defaultProps = {
  content: null,
  affiliateLogo: null,
  buttonText: null,
  campaignId: null,
  userId: null,
};

LinkAction.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  link: PropTypes.string.isRequired,
  affiliateLogo: PropTypes.string,
  buttonText: PropTypes.string,
  campaignId: PropTypes.string,
  userId: PropTypes.string,
};

export default LinkAction;
