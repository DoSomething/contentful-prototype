import PropTypes from 'prop-types';
import React from 'react';
import Markdown from '../Markdown';
import ScrollConcierge from '../ScrollConcierge';
import CallToActionBlockContainer from '../../containers/CallToActionBlockContainer';

import './content-page.scss';

const Page = ({ header, markdown, ctaContent, ctaTitle, buttonOverride, experiment, alternative }) => ( // eslint-disable-line max-len
  <div className="content-page">
    <div className="primary">
      <ScrollConcierge />
      <article>
        <h2 className="visually-hidden">{ header }</h2>
        <Markdown>{ markdown }</Markdown>
      </article>
    </div>
    <div className="secondary">
      {ctaContent ? (
        <CallToActionBlockContainer
          experiment={experiment}
          alternative={alternative}
          buttonOverride={buttonOverride}
          fields={{ content: ctaContent }}
        />
      ) : null}
    </div>

    <CallToActionBlockContainer
      experiment={experiment}
      alternative={alternative}
      buttonOverride={buttonOverride}
      fields={{ title: ctaTitle }}
      modifierClasses="transparent"
    />
  </div>
);

Page.propTypes = {
  header: PropTypes.string.isRequired,
  markdown: PropTypes.string.isRequired,
  ctaContent: PropTypes.string,
  ctaTitle: PropTypes.string.isRequired,
  alternative: PropTypes.string,
  buttonOverride: PropTypes.string,
  experiment: PropTypes.string,
};

Page.defaultProps = {
  alternative: null,
  buttonOverride: null,
  experiment: null,
  ctaContent: null,
};

const ContentPage = (props) => {
  const { pages, route, tagline, noun, verb, isCampaignClosed } = props;
  const ctaContent = isCampaignClosed ? null : `${tagline}\n\n__Join hundreds of members and ${verb.plural} ${noun.plural}!__`;

  // Load the page by the slug, or return a 404 page.
  const page = pages.find(item => item.fields.slug === route.page);
  if (! page) {
    const copy = 'That page could not be found. Try choosing from the links above!';
    return <Page header="Not Found" markdown={copy} ctaTitle={tagline} ctaContent={ctaContent} />;
  }

  const header = page.fields.title;
  const markdown = page.fields.content;

  return (
    <Page
      header={header}
      ctaTitle={tagline}
      markdown={markdown}
      ctaContent={ctaContent}
    />
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
  isCampaignClosed: PropTypes.bool.isRequired,
};

ContentPage.defaultProps = {
  pages: [],
  noun: { singular: 'action', plural: 'action' },
  tagline: 'Ready to start?',
  verb: { singular: 'take', plural: 'take' },
};

export default ContentPage;
