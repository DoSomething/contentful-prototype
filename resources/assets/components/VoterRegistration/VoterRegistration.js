import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Markdown from '../Markdown';
import { makeUrl } from '../../helpers';
import { Flex, FlexCell } from '../Flex';
import StepHeader from '../ActionPage/StepHeader';

const VoterRegistration = (props) => {
  const { content, hideStepNumber, stepIndex,
    template, title, dynamicLink } = props;

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


  return (
    <FlexCell width="full">
      <div className={classnames('action-step')}>
        <Flex>
          <StepHeader
            title={title}
            template={template}
            hideStepNumber={hideStepNumber}
            stepIndex={stepIndex}
          />
          <FlexCell width="two-thirds">
            <Markdown>{ content.replace(/:::[a-zA-Z]*:::/gi, link) }</Markdown>
          </FlexCell>
        </Flex>
      </div>
    </FlexCell>
  );
};

VoterRegistration.propTypes = {
  content: PropTypes.string,
  hideStepNumber: PropTypes.bool,
  stepIndex: PropTypes.number.isRequired,
  template: PropTypes.string.isRequired,
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
