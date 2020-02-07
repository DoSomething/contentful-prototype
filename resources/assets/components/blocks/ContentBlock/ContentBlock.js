import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import LazyImage from '../../utilities/LazyImage';
import { contentfulImageUrl } from '../../../helpers';
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
    contentBlockImageAlignment: imageAlignment
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
    <div className={classnames(className, 'pb-6')}>
      {title ? (
        <SectionHeader underlined superTitle={superTitle} title={title} />
      ) : null}

      <div className="md:grid grid-flow-row-dense grid-cols-3 gap-4">
        {image.url ? (
          <div
            className={classnames('mb-3', 'col-span-1', {
              'order-1': imageAlignment === 'LEFT',
              'order-2': imageAlignment === 'RIGHT',
            })}
          >
            <LazyImage
              src={contentfulImageUrl(image.url, '600', '600', 'fill')}
              alt={image.description || 'content-block'}
            />
          </div>
        ) : null}

        <div className="col-span-2 order-1">{contentNode}</div>
      </div>
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
