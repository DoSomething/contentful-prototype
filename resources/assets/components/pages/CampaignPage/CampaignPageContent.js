import React from 'react';
import { find } from 'lodash';
import PropTypes from 'prop-types';

import NotFound from '../../NotFound';
import { isCampaignClosed } from '../../../helpers';
import ScrollConcierge from '../../ScrollConcierge';
import ContentfulEntry from '../../ContentfulEntry';
import Markdown from '../../utilities/Markdown/Markdown';
import { CallToActionContainer } from '../../CallToAction';

const CampaignPageContent = props => {
  const {
    campaignEndDate,
    isCommunity,
    match,
    noun,
    pages,
    tagline,
    verb,
  } = props;

  const pageSlug = isCommunity ? 'community' : match.params.slug;

  const subPage = find(
    pages,
    page =>
      page.type === 'page' ? page.fields.slug.endsWith(pageSlug) : false,
  );

  if (!subPage) {
    return <NotFound />;
  }

  const isClosed = isCampaignClosed(campaignEndDate);

  const ctaContent = `${tagline} Join hundreds of members and ${verb.plural} ${
    noun.plural
  }!`;

  if (isCommunity) {
    return (
      <div className="clearfix padded campaign-subpage" id={subPage.id}>
        <div>
          <ScrollConcierge />
          {subPage.fields.blocks.map(block => (
            <div className="margin-vertical" key={block.id}>
              <ContentfulEntry json={block} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="clearfix padded campaign-page" id={subPage.id}>
      <div className="primary">
        <ScrollConcierge />
        <article className="padded bordered rounded bg-white">
          <h2 className="visually-hidden">{subPage.fields.title}</h2>

          {subPage.fields.content ? (
            <Markdown>{subPage.fields.content}</Markdown>
          ) : null}
        </article>
      </div>

      {isClosed ? null : (
        <div className="secondary">
          <CallToActionContainer
            content={ctaContent}
            useCampaignTagline
            visualStyle="dark"
          />
        </div>
      )}

      {isClosed ? null : (
        <CallToActionContainer useCampaignTagline visualStyle="transparent" />
      )}
    </div>
  );
};

CampaignPageContent.propTypes = {
  campaignEndDate: PropTypes.string,
  isCommunity: PropTypes.bool,
  match: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  noun: PropTypes.shape({
    singular: PropTypes.string,
    plural: PropTypes.string,
  }),
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      fields: PropTypes.shape({
        title: PropTypes.string,
        slug: PropTypes.string,
        content: PropTypes.string,
      }),
    }),
  ),
  tagline: PropTypes.string,
  verb: PropTypes.shape({
    singular: PropTypes.string,
    plural: PropTypes.string,
  }),
};

CampaignPageContent.defaultProps = {
  campaignEndDate: null,
  isCommunity: false,
  pages: [],
  match: {
    params: {},
  },
  noun: {
    singular: 'action',
    plural: 'action',
  },
  tagline: 'Ready to start?',
  verb: {
    singular: 'take',
    plural: 'take',
  },
};

export default CampaignPageContent;
