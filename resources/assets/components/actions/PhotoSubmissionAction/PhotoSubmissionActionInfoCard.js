import React from 'react';
import PropTypes from 'prop-types';

import Card from '../../utilities/Card/Card';
import TextContent from '../../utilities/TextContent/TextContent';

const PhotoSubmissionActionInfoCard = ({ title, content }) => (
  <div className="photo-submission-information">
    <Card title={title} className="bordered rounded">
      <TextContent className="p-3">{content}</TextContent>
    </Card>
  </div>
);

PhotoSubmissionActionInfoCard.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
};

PhotoSubmissionActionInfoCard.defaultProps = {
  title: null,
  content: null,
};

export default PhotoSubmissionActionInfoCard;
