import React from 'react';
import PropTypes from 'prop-types';

import Card from '../Card';
import Markdown from '../Markdown';
import { Flex, FlexCell } from '../Flex';
import SectionHeader from '../SectionHeader';
import { dynamicString } from '../../helpers';

import './voter-registration.scss';

const VoterRegistration = (props) => {
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
        <Card className="rounded bordered voter-registration" title={title}>
          <div className="padded clearfix">
            <Markdown>{ content }</Markdown>

            { link ? <a className="button" href={dynamicString(link, tokens)} target="blank">Start Registration</a> : null }
          </div>
        </Card>
      </FlexCell>
    </Flex>
  );
};

VoterRegistration.propTypes = {
  campaignId: PropTypes.string.isRequired,
  campaignRunId: PropTypes.string.isRequired,
  content: PropTypes.string,
  hideStepNumber: PropTypes.bool,
  link: PropTypes.string,
  stepIndex: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

VoterRegistration.defaultProps = {
  content: 'Register to vote!',
  hideStepNumber: true,
  link: null,
};

export default VoterRegistration;
