import React from 'react';
import PropTypes from 'prop-types';

import PageCard from '../../utilities/PageCard/PageCard';

const HomePageArticleGallery = ({ articles }) => {
  return (
    <ul className="article-gallery mt-0 gap-8 grid grid-cols-1 md:grid-cols-2 xxl:grid-cols-4">
      {articles.map(article => {
        return (
          <li key={article.id}>
            <PageCard page={article} />
          </li>
        );
      })}
    </ul>
  );
};

HomePageArticleGallery.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default HomePageArticleGallery;
