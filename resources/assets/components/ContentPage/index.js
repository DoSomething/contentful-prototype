import PropTypes from 'prop-types';
import React from 'react';
import Markdown from '../Markdown';
import CallToActionContainer from '../../containers/CallToActionContainer';

import './content-page.scss';

const ContentPage = ({ pages, route }) => {
  const page = pages.find(item => item.fields.slug === route.page);

  // @TODO: temporary variables until these CTAs are no longer hardcoded.
  const ctaText1 = { content: 'Help us send letters of support to every mosque in the US.\n\n__Join hundreds of members members making cards!__' };
  const ctaText2 = { content: 'Help us send letters of support to every mosque in the United States.' };

  return (
    <div className="content-page">
      <div className="primary">
        <article>
          <h2 className="visually-hidden">{page.fields.title}</h2>
          <Markdown>{page.fields.content}</Markdown>
        </article>
      </div>
      <div className="secondary">
        <CallToActionContainer fields={ctaText1} />
      </div>

      <CallToActionContainer fields={ctaText2} modifierClasses="transparent" />
    </div>
  );
};

ContentPage.propTypes = {
  pages: PropTypes.arrayOf(PropTypes.shape({
    fields: PropTypes.shape({
      title: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    }),
  })),
  route: PropTypes.instanceOf(Object).isRequired,
};

ContentPage.defaultProps = {
  pages: [],
};

export default ContentPage;
