import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import LazyImage from '../../utilities/LazyImage';
import ContentBlockFooter from './ContentBlockFooter';
import { contentfulImageUrl } from '../../../helpers';
import TextContent from '../../utilities/TextContent/TextContent';
import SectionHeader from '../../utilities/SectionHeader/SectionHeader';

export const ContentBlockFragment = gql`
  fragment ContentBlockFragment on ContentBlock {
    additionalContent
    superTitle
    title
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

const ContentBlock = ({
  additionalContent,
  className,
  content,
  fullWidth,
  image,
  imageAlignment,
  superTitle,
  title,
}) => {
  const contentNode = content ? <TextContent>{content}</TextContent> : null;
  const { footerType } = additionalContent;
  // The CivicEngineVoterWidget should only be full width if not rendered on a campaign page.
  const fullWidthFooter =
    footerType === 'GetOutTheVoteBlock' ||
    (footerType === 'CivicEngineVoterWidget' &&
      !window.location.pathname.includes('/us/campaigns/'));

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

        <div
          data-testid="content-block-content"
          className={classnames('col-span-2', 'order-1', {
            /*
              When no image is provided, we can toggle the content to span across the full row.

              This is necessary on 'General Pages' or in 'Modals' where the overlaying row width is more restricted,
              and thus the content width is confined to accommodate the image, whereas on 'Campaign Pages', we assign
              *extra* overlaying row space to Content Blocks, allowing the image to just optionally display within the extra space.

              Additionally, if footer should be rendered full width, span content across full view.
            */
            'col-span-3': (!image.url && fullWidth) || fullWidthFooter,
          })}
        >
          {contentNode}

          {footerType ? <ContentBlockFooter type={footerType} /> : null}
        </div>
      </div>
    </div>
  );
};

ContentBlock.propTypes = {
  additionalContent: PropTypes.object,
  className: PropTypes.string,
  content: PropTypes.string.isRequired,
  fullWidth: PropTypes.bool,
  image: PropTypes.shape({
    url: PropTypes.string,
    description: PropTypes.string,
  }),
  imageAlignment: PropTypes.oneOf(['RIGHT', 'LEFT']),
  superTitle: PropTypes.string,
  title: PropTypes.string,
};

ContentBlock.defaultProps = {
  additionalContent: {},
  className: null,
  fullWidth: false,
  image: {},
  imageAlignment: 'RIGHT',
  superTitle: null,
  title: null,
};

export default ContentBlock;
