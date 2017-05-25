import PropTypes from 'prop-types';
import React from 'react';
import Markdown from '../Markdown';
import ScrollConcierge from '../ScrollConcierge';
import CallToActionContainer from '../../containers/CallToActionContainer';
import ExperimentContainer from '../../containers/ExperimentContainer';

import './content-page.scss';

const SCHOLARSHIP_CTA_COPY = 'scholarship_cta_copy';

const Page = ({ header, markdown, ctaContent, ctaTitle, buttonOverride }) => (
  <div className="content-page">
    <div className="primary">
      <ScrollConcierge />
      <article>
        <h2 className="visually-hidden">{ header }</h2>
        <Markdown>{ markdown }</Markdown>
      </article>
    </div>
    <div className="secondary">
      <CallToActionContainer
        buttonOverride={buttonOverride}
        fields={{ content: ctaContent }}
      />
    </div>

    <CallToActionContainer
      buttonOverride={buttonOverride}
      fields={{ title: ctaTitle }}
      modifierClasses="transparent"
    />
  </div>
);

const ContentPage = (props) => {
  const { pages, route, tagline, noun, verb, convertExperiment } = props;
  const page = pages.find(item => item.fields.slug === route.page);

  const header = page.fields.title;
  const markdown = page.fields.content;
  const ctaContent = `${tagline}\n\n__Join hundreds of members and ${verb.plural} ${noun.plural}!__`;

  if (route.page.includes('scholarship')) {
    return (
      <ExperimentContainer name={SCHOLARSHIP_CTA_COPY}>
        <Page
          experiment={SCHOLARSHIP_CTA_COPY}
          alternative="default"
          convert={convertExperiment}
          header={header}
          ctaTitle={tagline}
          markdown={markdown}
          ctaContent={ctaContent}
        />
        <Page
          experiment={SCHOLARSHIP_CTA_COPY}
          alternative="get_started"
          convert={convertExperiment}
          header={header}
          ctaTitle={tagline}
          markdown={markdown}
          ctaContent={ctaContent}
          buttonOverride="GET STARTED"
        />
        <Page
          experiment={SCHOLARSHIP_CTA_COPY}
          alternative="apply_now"
          convert={convertExperiment}
          header={header}
          ctaTitle={tagline}
          markdown={markdown}
          ctaContent={ctaContent}
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
