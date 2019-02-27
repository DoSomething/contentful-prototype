import React from 'react';
import PropTypes from 'prop-types';

import ContentfulEntry from '../../ContentfulEntry';

const StoryPage = props => {
  const { blocks, subTitle, title } = props;

  return (
    <div>
      <h1>{title}</h1>
      {subTitle ? <h2>{subTitle}</h2> : null}

      {blocks.map(block => (
        <ContentfulEntry key={block.id} json={block} />
      ))}
    </div>
  );
};

StoryPage.propTypes = {
  blocks: PropTypes.arrayOf(PropTypes.object),
  subTitle: PropTypes.string,
  title: PropTypes.string.isRequired,
};

StoryPage.defaultProps = {
  blocks: [],
  subTitle: null,
};

export default StoryPage;
