import React from 'react';
import PropTypes from 'prop-types';

import { Figure } from '../../../Figure';
import { contentfulImageUrl } from '../../../../helpers';

const StaffTemplate = props => {
  const {
    showcaseTitle,
    showcaseImage,
    showcaseDescription,
    twitterId,
  } = props;
  return (
    <Figure
      alt={`${showcaseTitle}-photo`}
      image={contentfulImageUrl(showcaseImage.url, '400', '400', 'fill')}
    >
      <h4>
        {twitterId ? (
          <a
            href={`https://twitter.com/${twitterId}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            {showcaseTitle}
          </a>
        ) : (
          showcaseTitle
        )}
      </h4>
      <p>{showcaseDescription}</p>
    </Figure>
  );
};

StaffTemplate.propTypes = {
  twitterId: PropTypes.string,
  showcaseTitle: PropTypes.string,
  showcaseDescription: PropTypes.string,
  showcaseImage: PropTypes.object,
};

StaffTemplate.defaultProps = {
  twitterId: null,
  showcaseTitle: null,
  showcaseImage: null,
  showcaseDescription: null,
};

export default StaffTemplate;
