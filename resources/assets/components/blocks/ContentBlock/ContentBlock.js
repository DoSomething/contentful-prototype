import React from 'react';
import PropTypes from 'prop-types';

import Markdown from '../../Markdown';
import { Figure } from '../../Figure';
import SectionHeader from '../../SectionHeader';

import './content-block.scss';

const ContentBlock = props => {
  const { content, image, imageAlignment, superTitle, title } = props;

  const defaultImageAlignment = ContentBlock.defaultProps.imageAlignment;

  const contentNode = content ? <Markdown>{content}</Markdown> : null;

  return (
    <div className="content-block">
      {title ? (
        <div className="margin-horizontal-md">
          <SectionHeader preTitle={superTitle} title={title} hideStepNumber />
        </div>
      ) : null}

      <div className="margin-horizontal-md">
        {image ? (
          <Figure
            image={image}
            alt="content-block"
            alignment={`${imageAlignment || defaultImageAlignment}-collapse`}
            size="large"
            className="content-block"
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
