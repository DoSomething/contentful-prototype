import React from 'react';
import PropTypes from 'prop-types';

import Markdown from '../Markdown';
import { makeUrl } from '../../helpers';
import { Flex, FlexCell } from '../Flex';
import SectionHeader from '../SectionHeader';

const VoterRegistration = (props) => {
  const { content, hideStepNumber, stepIndex,
    title, dynamicLink } = props;

  const { baseUrl, params, type } = dynamicLink;

  const query = params.reduce((paramsObject, param) => ({
    ...paramsObject,
    [param.property]: param.dynamic ? props[param.value] : param.value,
  }), {});

  let link;

  if (type === 'turboVote') {
    const queryValue = Object.entries(query)
      .map(([key, value]) => (`${key}:${value}`))
      .join(',');

    link = `${baseUrl}?r=${queryValue}`;
  } else {
    link = makeUrl(baseUrl, query).href;
  }

  const formattedContent = (
    content || VoterRegistration.defaultProps.content
  ).replace(/:::[a-zA-Z]*:::/gi, link);

  return (
    <Flex>
      <SectionHeader
        title={title}
        hideStepNumber={hideStepNumber}
        stepIndex={stepIndex}
      />
      <FlexCell width="two-thirds">
        <Markdown>{ formattedContent }</Markdown>
      </FlexCell>
    </Flex>
  );
};

VoterRegistration.propTypes = {
  content: PropTypes.string,
  hideStepNumber: PropTypes.bool,
  stepIndex: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  dynamicLink: PropTypes.shape({
    baseUrl: PropTypes.string,
    params: PropTypes.arrayOf(PropTypes.object),
    type: PropTypes.string,
  }).isRequired,
};

VoterRegistration.defaultProps = {
  content: 'Register to vote!',
  hideStepNumber: true,
};

export default VoterRegistration;
