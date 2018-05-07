import React from 'react';
import { find } from 'lodash';
import PropTypes from 'prop-types';

import NotFound from '../../NotFound';
import Enclosure from '../../Enclosure';
import ContentfulEntry from '../../ContentfulEntry';

import './general-page.scss';

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
          <div className="general-page__heading text-centered">
            <h1 className="general-page__title caps-lock">{title}</h1>
            <p className="general-page__subtitle">{subTitle}</p>
          </div>
          {blocks.map(block => (
            <div className="general-page__block margin-vertical-lg">
              <ContentfulEntry key={block.id} json={block} />
            </div>
          ))}
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
