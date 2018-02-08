import React from 'react';
import PropTypes from 'prop-types';

import Card from '../../Card';
import Markdown from '../../Markdown';
import { Flex, FlexCell } from '../../Flex';
import SectionHeader from '../../SectionHeader';
import { dynamicString } from '../../../helpers';

import './voter-registration-action.scss';

const VoterRegistrationAction = (props) => {
  const {
    campaignId,
    campaignRunId,
    content,
    hideStepNumber,
    link,
    stepIndex,
    title,
    userId,
  } = props;

  const tokens = {
    northstarId: userId,
    campaignId,
    campaignRunId,
    source: 'web',
  };

  return (
    <Flex>
      <SectionHeader
        title={title}
        hideStepNumber={hideStepNumber}
        step={stepIndex}
      />
      <FlexCell width="two-thirds">
        <Card className="rounded bordered voter-registration" title="Register to vote">
          <div className="padded clearfix">
            <Markdown>{ content }</Markdown>

            { link ? <a className="button" href={dynamicString(link, tokens)} target="_blank">Start Registration</a> : null }
          </div>
        </Card>
      </FlexCell>
    </Flex>
  );
};

VoterRegistrationAction.propTypes = {
  campaignId: PropTypes.string.isRequired,
  campaignRunId: PropTypes.string.isRequired,
  content: PropTypes.string,
  hideStepNumber: PropTypes.bool,
  link: PropTypes.string.isRequired,
  stepIndex: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

VoterRegistrationAction.defaultProps = {
  content: 'Register to vote!',
  hideStepNumber: true,
};

export default VoterRegistrationAction;
