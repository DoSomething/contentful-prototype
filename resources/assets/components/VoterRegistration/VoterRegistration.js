import React from 'react';
import PropTypes from 'prop-types';

import Card from '../Card';
import Markdown from '../Markdown';
import { Flex, FlexCell } from '../Flex';
import SectionHeader from '../SectionHeader';
import { dynamicString, makeUrl } from '../../helpers';

const VoterRegistration = (props) => {
  const { campaignId, campaignRunId, content, hideStepNumber, stepIndex,
    title, dynamicLink, userId } = props;

  // @TODO: probs do not need these anymore...
  const { baseUrl, params, type } = dynamicLink;

  const tokens = {
    northstarId: userId,
    campaignId,
    campaignRunId,
    source: 'web',
  };

  // @TODO: Add "link" field in Voter Registration Content Type and pull URL from there!
  const link = dynamicString('https://testing-dosomething.turbovote.org/?r=user:{northstarId},campaignID:{campaignId},campaignRunID:{campaignRunId},source:{source}', tokens);

  const query = params.reduce((paramsObject, param) => ({
    ...paramsObject,
    [param.property]: param.dynamic ? props[param.value] : param.value,
  }), {});


  // @TODO: no longer need the following...
  // let oldLink;
  // if (type === 'turboVote') {
  //   const queryValue = Object.entries(query)
  //     .map(([key, value]) => (`${key}:${value}`))
  //     .join(',');

  //   oldLink = `${baseUrl}?r=${queryValue}`;
  // } else {
  //   oldLink = makeUrl(baseUrl, query).href;
  // }

  // const formattedContent = (
  //   content || VoterRegistration.defaultProps.content
  // ).replace(/:::[a-zA-Z]*:::/gi, oldLink);

  return (
    <Flex>
      <SectionHeader
        title={title}
        hideStepNumber={hideStepNumber}
        stepIndex={stepIndex}
      />
      <FlexCell width="two-thirds">
        <Card className="rounded bordered" title={title}>
          <Markdown className="padded">{ content }</Markdown>

          <a className="button" href={link} target="blank">Start Registration</a>
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
  stepIndex: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  dynamicLink: PropTypes.shape({
    baseUrl: PropTypes.string,
    params: PropTypes.arrayOf(PropTypes.object),
    type: PropTypes.string,
  }).isRequired,
  userId: PropTypes.string.isRequired,
};

VoterRegistration.defaultProps = {
  content: 'Register to vote!',
  hideStepNumber: true,
};

export default VoterRegistration;
