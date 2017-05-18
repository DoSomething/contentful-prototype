import PropTypes from 'prop-types';
import React from 'react';
import Markdown from '../Markdown';
import CallToActionContainer from '../../containers/CallToActionContainer';
import ScrollConcierge from '../ScrollConcierge';

import './content-page.scss';

const ContentPage = ({ pages, route, tagline, noun, verb }) => {
  const page = pages.find(item => item.fields.slug === route.page);

  return (
    <div className="content-page">
      <div className="primary">
        <ScrollConcierge />
        <article>
          <h2 className="visually-hidden">{page.fields.title}</h2>
          <Markdown>{page.fields.content}</Markdown>
        </article>
      </div>
      <div className="secondary">
        <CallToActionContainer fields={{ content: `${tagline}\n\n__Join hundreds of members and ${verb.plural} ${noun.plural}!__` }} />
      </div>

      <CallToActionContainer fields={{ title: tagline }} modifierClasses="transparent" />
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
  noun: PropTypes.shape({
    singular: PropTypes.string,
    plural: PropTypes.string,
  }),
  route: PropTypes.instanceOf(Object).isRequired,
  tagline: PropTypes.string,
  verb: PropTypes.shape({
    singular: PropTypes.string,
    plural: PropTypes.string,
  }),
};

ContentPage.defaultProps = {
  pages: [],
  noun: { singular: 'action', plural: 'action' },
  tagline: 'Ready to start?',
  verb: { singular: 'take', plural: 'take' },
};

export default ContentPage;
