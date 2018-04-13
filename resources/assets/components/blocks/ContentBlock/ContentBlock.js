import React from 'react';
import PropTypes from 'prop-types';

import Markdown from '../../Markdown';
import SectionHeader from '../../SectionHeader';
import { Figure } from '../../Figure';

import './content-block.scss';

const ContentBlock = props => {
  const { content, image, imageAlignment, superTitle, title } = props;

  const imageAlignmentClass =
    // ensure proper responsiveness setting for the figure component (only required for 'left')
    (imageAlignment === 'left' && 'left-collapse') ||
    imageAlignment ||
    ContentBlock.defaultProps.imageAlignment;

  const contentNode = content ? <Markdown>{content}</Markdown> : null;

  return (
    <div className="content-block">
      <div className="margin-horizontal-md">
        <SectionHeader preTitle={superTitle} title={title} hideStepNumber />
      </div>

      <div className="margin-horizontal-md">
        {image ? (
          <Figure
            image={image}
            alt="content-block"
            alignment={imageAlignmentClass}
            size="large"
          >
            {contentNode}
          </Figure>
        ) : (
          contentNode
        )}
      </div>
    </div>
  );
};

ContentBlock.propTypes = {
  content: PropTypes.string.isRequired,
  image: PropTypes.string,
  imageAlignment: PropTypes.string,
  superTitle: PropTypes.string,
  title: PropTypes.string,
};

ContentBlock.defaultProps = {
  image: null,
  imageAlignment: 'right',
  superTitle: null,
  title: null,
};

export default ContentBlock;
