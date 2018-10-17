import React from 'react';
import PropTypes from 'prop-types';

import { Figure } from '../../../Figure';
import { contentfulImageUrl } from '../../../../helpers';

const StaffTemplate = props => {
  const { name, jobTitle, alternatePhoto, twitterId } = props;

  return (
    <Figure
      alt={`${name}-photo`}
      image={contentfulImageUrl(alternatePhoto, '400', '400', 'fill')}
    >
      <h3>{name}</h3>
      <p>
        <em>{jobTitle}</em>
      </p>
      {twitterId ? (
        <a
          href={`https://twitter.com/${twitterId}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          @{twitterId}
        </a>
      ) : null}
    </Figure>
  );
};

StaffTemplate.propTypes = {
  name: PropTypes.string.isRequired,
  jobTitle: PropTypes.string.isRequired,
  alternatePhoto: PropTypes.string.isRequired,
  twitterId: PropTypes.string,
};

StaffTemplate.defaultProps = {
  twitterId: null,
};

export default StaffTemplate;
