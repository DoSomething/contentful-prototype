import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Markdown from '../../Markdown';
import { Flex, FlexCell } from '../../Flex';
import SectionHeader from '../../SectionHeader';

const ThirdParyAction = props => {
  const {
    content,
    dynamicLink,
    dynamicUrlParams,
    hideStepNumber,
    stepIndex,
    title,
    userId,
  } = props;

  let contentLink = '';

  const urlParams = dynamicUrlParams.map(param => {
    const value = param === 'northstar_id' ? userId : props[param];

    return `${param}=${value}`;
  });

  if (dynamicLink) {
    contentLink =
      dynamicLink.indexOf('?') === -1
        ? `${dynamicLink}?${urlParams.join('&')}`
        : `${dynamicLink}&${urlParams.join('&')}`;
  }

  return (
    <FlexCell width="full">
      <div className={classnames('legacy-content-block')}>
        <Flex>
          <SectionHeader
            title={title}
            step={stepIndex}
            hideStepNumber={hideStepNumber}
          />
          {content ? (
            <FlexCell width="two-thirds">
              <Markdown>
                {content.replace(/:::[a-zA-Z]*:::/gi, contentLink)}
              </Markdown>
            </FlexCell>
          ) : null}
        </Flex>
      </div>
    </FlexCell>
  );
};

ThirdParyAction.propTypes = {
  content: PropTypes.string,
  dynamicLink: PropTypes.string,
  dynamicUrlParams: PropTypes.arrayOf(PropTypes.string),
  hideStepNumber: PropTypes.bool,
  stepIndex: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  userId: PropTypes.string,
};

ThirdParyAction.defaultProps = {
  content: null,
  dynamicLink: null,
  dynamicUrlParams: [],
  hideStepNumber: false,
  userId: null,
};

export default ThirdParyAction;
