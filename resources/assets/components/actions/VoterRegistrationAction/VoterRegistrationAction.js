import React from 'react';
import PropTypes from 'prop-types';

import Card from '../../Card';
import Markdown from '../../Markdown';
import { dynamicString } from '../../../helpers';

import './voter-registration-action.scss';

const VoterRegistrationAction = (props) => {
  const {
    campaignId,
    campaignRunId,
    content,
    contentfulId,
    link,
    modalType,
    trackEvent,
    userId,
  } = props;

  const tokens = {
    northstarId: userId,
    campaignId,
    campaignRunId,
    source: 'web',
  };

  const parsedLink = link && dynamicString(link, tokens);

  const handleClick = () => {
    const trackingData = { contentfulId, url: parsedLink, modal: modalType };
    trackEvent('clicked voter registration action', trackingData);
  };

  return (
    <Card className="rounded bordered voter-registration" title="Register to vote">
      <div className="padded clearfix">
        <Markdown>{ content }</Markdown>

        { parsedLink ? <a className="button" href={parsedLink} onClick={handleClick} target="_blank">Start Registration</a> : null }
      </div>
    </Card>
  );
};

VoterRegistrationAction.propTypes = {
  campaignId: PropTypes.string.isRequired,
  campaignRunId: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentfulId: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  modalType: PropTypes.string,
  trackEvent: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};

VoterRegistrationAction.defaultProps = {
  content: 'Register to vote!',
  modalType: null,
};

export default VoterRegistrationAction;
