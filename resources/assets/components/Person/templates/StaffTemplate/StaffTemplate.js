import React from 'react';
import PropTypes from 'prop-types';

import { Figure } from '../../../Figure';
import { contentfulImageUrl } from '../../../../helpers';

const StaffTemplate = props => {
  const {
    showcasableTitle,
    showcasableImage,
    showcasableDescription,
    twitterId,
  } = props;
  return (
    <Figure alt={`${showcasableTitle}-photo`} image={showcasableImage}>
      <h4>
        {twitterId ? (
          <a
            href={`https://twitter.com/${twitterId}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            {showcasableTitle}
          </a>
        ) : (
          name
        )}
      </h4>
      <p>{showcasableDescription}</p>
    </Figure>
  );
};

StaffTemplate.propTypes = {
  twitterId: PropTypes.string,
  showcasableTitle: PropTypes.string,
  showcasableDescription: PropTypes.string,
  showcasableImage: PropTypes.string,
};

StaffTemplate.defaultProps = {
  twitterId: null,
  showcasableTitle: null,
  showcasableImage: null,
  showcasableDescription: null,
};

export default StaffTemplate;
