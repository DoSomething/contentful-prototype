import PropTypes from 'prop-types';
import React from 'react';
import Markdown from '../Markdown';
import ScrollConcierge from '../ScrollConcierge';
import CallToActionBlockContainer from '../../containers/CallToActionBlockContainer';
import ExperimentContainer from '../../containers/ExperimentContainer';

import './content-page.scss';

const SCHOLARSHIP_CTA_COPY = 'scholarship_cta_copy';

const Page = ({ header, markdown, ctaContent, ctaTitle,
  buttonOverride, experiment, alternative }) => (

    <div className="content-page">
      <div className="primary">
        <ScrollConcierge />
        <article>
          <h2 className="visually-hidden">{ header }</h2>
          <Markdown>{ markdown }</Markdown>
        </article>
      </div>
      <div className="secondary">
        <CallToActionBlockContainer
          experiment={experiment}
          alternative={alternative}
          buttonOverride={buttonOverride}
          fields={{ content: ctaContent }}
        />
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
  ctaContent: PropTypes.string.isRequired,
  ctaTitle: PropTypes.string.isRequired,
  alternative: PropTypes.string,
  buttonOverride: PropTypes.string,
  experiment: PropTypes.string,
};

Page.defaultProps = {
  alternative: null,
  buttonOverride: null,
  experiment: null,
};

const ContentPage = (props) => {
  const { pages, route, tagline, noun, verb } = props;
  const ctaContent = `${tagline}\n\n__Join hundreds of members and ${verb.plural} ${noun.plural}!__`;

  // Load the page by the slug, or return a 404 page.
  const page = pages.find(item => item.fields.slug === route.page);
  if (! page) {
    const copy = 'That page could not be found. Try choosing from the links above!';
    return <Page header="Not Found" markdown={copy} ctaTitle={tagline} ctaContent={ctaContent} />;
  }

  const header = page.fields.title;
  const markdown = page.fields.content;

  if (route.page.includes('scholarship')) {
    return (
      <ExperimentContainer name={SCHOLARSHIP_CTA_COPY}>
        <Page
          experiment={SCHOLARSHIP_CTA_COPY}
          alternative="default"
          header={header}
          ctaTitle={tagline}
          markdown={markdown}
          ctaContent={ctaContent}
        />
        <Page
          experiment={SCHOLARSHIP_CTA_COPY}
          alternative="get_started"
          header={header}
          ctaTitle="Make a card to qualify for a $3000 scholarship."
          markdown={markdown}
          ctaContent="__Make a card to qualify for a $3000 scholarship.__"
          buttonOverride="GET STARTED"
        />
        <Page
          experiment={SCHOLARSHIP_CTA_COPY}
          alternative="apply_now"
          header={header}
          ctaTitle="Make a card to qualify for a $3000 scholarship."
          markdown={markdown}
          ctaContent="__Make a card to qualify for a $3000 scholarship.__"
          buttonOverride="APPLY NOW"
        />
      </ExperimentContainer>
    );
  }

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
};

ContentPage.defaultProps = {
  pages: [],
  noun: { singular: 'action', plural: 'action' },
  tagline: 'Ready to start?',
  verb: { singular: 'take', plural: 'take' },
};

export default ContentPage;
