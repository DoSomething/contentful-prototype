import React from 'react';
import { find } from 'lodash';
import PropTypes from 'prop-types';

import NotFound from '../../NotFound';
import Enclosure from '../../Enclosure';
import ContentfulEntry from '../../ContentfulEntry';

/**
 * Render a general page
 *
 * @returns {XML}
 */
const GeneralPage = props => {
  const { match, pages } = props;

  const subPage = find(
    pages,
    page =>
      page.type === 'page'
        ? page.fields.slug.endsWith(match.params.slug)
        : false,
  );

  if (!subPage) {
    return <NotFound />;
  }

  const { title, subTitle, blocks } = subPage.fields;

  return (
    <div>
      <div className="main clearfix">
        <Enclosure className="default-container margin-top-lg margin-bottom-lg">
          <h1>{title}</h1>
          <h3>{subTitle}</h3>
          {subPage.fields.blocks.map(block => {
            return <ContentfulEntry key={block.id} json={block} />;
          })}
        </Enclosure>
      </div>
    </div>
  );
};

GeneralPage.propTypes = {
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      fields: PropTypes.shape({
        title: PropTypes.string,
        slug: PropTypes.string,
        blocks: PropTypes.arrayOf(PropTypes.object).isRequired,
      }),
    }),
  ),
};

GeneralPage.defaultProps = {
  pages: [],
};

export default GeneralPage;
