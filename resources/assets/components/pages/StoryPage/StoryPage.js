import React from 'react';
import PropTypes from 'prop-types';

import TextContent from '../../utilities/TextContent/TextContent';

const StoryPage = props => {
  const { content, subTitle, title } = props;

  return (
    <div>
      <h1>{title}</h1>
      {subTitle ? <h2>{subTitle}</h2> : null}
      <TextContent>{content}</TextContent>
    </div>
  );
};

StoryPage.propTypes = {
  content: PropTypes.oneOfType([PropTypes.object]).isRequired,
  subTitle: PropTypes.string,
  title: PropTypes.string.isRequired,
};

StoryPage.defaultProps = {
  subTitle: null,
};

export default StoryPage;
