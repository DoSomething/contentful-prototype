import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { contentfulImageUrl } from '../../../helpers';
import { Figure } from '../../utilities/Figure/Figure';
import TextContent from '../../utilities/TextContent/TextContent';
import SectionHeader from '../../utilities/SectionHeader/SectionHeader';

import './content-block.scss';

export const ContentBlockFragment = gql`
  fragment ContentBlockFragment on ContentBlock {
    superTitle
    title
    subTitle
    # Aliasing to avoid conflicting with *non-required* content fields in other fragments.
    contentBlockContent: content
    image {
      url
      description
    }
    # Aliasing to avoid conflicting with *required* imageAlignment field in GalleryBlockFragment.
    contentBlockimageAlignment: imageAlignment
  }
`;

const ContentBlock = props => {
  const {
    className,
    content,
    image,
    imageAlignment,
    superTitle,
    title,
  } = props;

  const contentNode = content ? <TextContent>{content}</TextContent> : null;

  return (
    <div className={classnames('content-block', className)}>
      {title ? (
        <SectionHeader underlined superTitle={superTitle} title={title} />
      ) : null}

      {image.url ? (
        <Figure
          image={contentfulImageUrl(image.url, '600', '600', 'fill')}
          alt={image.description || 'content-block'}
          alignment={`${imageAlignment.toLowerCase()}-collapse`}
          size="one-third"
        >
          {contentNode}
        </Figure>
      ) : (
        contentNode
      )}
    </div>
  );
};

ContentBlock.propTypes = {
  className: PropTypes.string,
  content: PropTypes.string.isRequired,
  image: PropTypes.shape({
    url: PropTypes.string,
    description: PropTypes.string,
  }),
  imageAlignment: PropTypes.oneOf(['RIGHT', 'LEFT']),
  superTitle: PropTypes.string,
  title: PropTypes.string,
};

ContentBlock.defaultProps = {
  className: null,
  image: {},
  imageAlignment: 'RIGHT',
  superTitle: null,
  title: null,
};

export default ContentBlock;
