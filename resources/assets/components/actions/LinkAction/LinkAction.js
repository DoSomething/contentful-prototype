import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Embed from '../../Embed';
import Markdown from '../../Markdown';
import Card from '../../utilities/Card/Card';
import SponsorPromotion from '../../SponsorPromotion';
import { trackPuckEvent } from '../../../helpers/analytics';
import { isExternal, dynamicString } from '../../../helpers';

const LinkAction = props => {
  const {
    content,
    link,
    userId,
    campaignId,
    buttonText,
    affiliateLogo,
  } = props;

  const onLinkClick = () => {
    trackPuckEvent('clicked link action', { link });
  };

  // The affiliate logo specific text is hard-coded for OZY. Though we can set this title
  // in Contentful, we currently can't for CampaignUpdates which have a similar affiliate flow,
  // so this ensures consistency until we make this part of the content editing process.
  const title = affiliateLogo ? 'See More Be More Do More' : props.title;

  const target = isExternal(link) ? '_blank' : '_self';
  const href = dynamicString(link, { campaignId, userId });

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
            onClick={onLinkClick}
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
          <a
            className="button button-attached"
            target={target}
            href={href}
            onClick={onLinkClick}
          >
            {buttonText}
          </a>
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
