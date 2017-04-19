import React from 'react';
import Markdown from '../Markdown';
import CallToActionContainer from '../../containers/CallToActionContainer';

import './content-page.scss';

const ContentPage = ({ pages, route }) => {
  const page = pages.find(item => item.fields.slug === route.page);

  // @TODO: temporary variables until these CTAs are no longer hardcoded.
  const ctaText1 = { content: 'aHelp us send letters of support to every mosque in the US.\n\n__Join hundreds of members members making cards!__' };
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
  pages: React.PropTypes.arrayOf(React.PropTypes.shape({
    fields: React.PropTypes.shape({
      title: React.PropTypes.string.isRequired,
      slug: React.PropTypes.string.isRequired,
      content: React.PropTypes.string.isRequired,
    }),
  })),
  route: React.PropTypes.instanceOf(Object).isRequired,
};

ContentPage.defaultProps = {
  pages: [],
};

export default ContentPage;
