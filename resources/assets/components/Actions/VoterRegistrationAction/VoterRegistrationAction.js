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
    userId,
  } = props;

  const tokens = {
    northstarId: userId,
    campaignId,
    campaignRunId,
    source: 'web',
  };

  return (
    <Card className="rounded bordered voter-registration" title="Register to vote">
      <div className="padded clearfix">
        <Markdown>{ content }</Markdown>

        { link ? <a className="button" href={dynamicString(link, tokens)} target="_blank">Start Registration</a> : null }
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
  userId: PropTypes.string.isRequired,
};

VoterRegistrationAction.defaultProps = {
  content: 'Register to vote!',
};

export default VoterRegistrationAction;
