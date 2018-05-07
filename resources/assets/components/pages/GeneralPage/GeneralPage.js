import React from 'react';
import PropTypes from 'prop-types';

import Enclosure from '../../Enclosure';
import ContentfulEntry from '../../ContentfulEntry';

import './general-page.scss';

/**
 * Render a general page
 *
 * @returns {XML}
 */
const GeneralPage = props => {
  const { title, subTitle, blocks } = props;

  return (
    <div>
      <div className="main clearfix general-page">
        <Enclosure className="default-container margin-top-lg margin-bottom-lg">
          <div className="general-page__heading text-centered">
            <h1 className="general-page__title caps-lock">{title}</h1>
            {subTitle ? (
              <p className="general-page__subtitle">{subTitle}</p>
            ) : null}
          </div>

          {blocks.map(block => (
            <div className="general-page__block margin-vertical" key={block.id}>
              <ContentfulEntry json={block} />
            </div>
          ))}
        </Enclosure>
      </div>
    </div>
  );
};

GeneralPage.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  blocks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

GeneralPage.defaultProps = {
  subTitle: null,
};

export default GeneralPage;
