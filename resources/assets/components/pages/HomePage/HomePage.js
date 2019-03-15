/* global window */

import React from 'react';
import { get } from 'lodash';

import sponsorList from './sponsor-list';
import { contentfulImageUrl } from '../../../helpers';

import './home-page.scss';

class HomePage extends React.Component {
  constructor() {
    super();
    this.state = get(window.HOMEPAGE, 'fields', {});
  }

  renderGalleryBlock = block => {
    const { id, type, staffPick } = block;

    const isCampaign = type === 'campaign';

    const fields = isCampaign ? block : block.fields;
    const { slug, title, coverImage } = fields;

    return (
      <article className="tile" key={id}>
        <a
          className="wrapper"
          href={`/us/${isCampaign ? 'campaigns/' : ''}${slug}`}
        >
          {staffPick ? (
            <div className="tile__flag -staff-pick">STAFF PICK</div>
          ) : null}

          <div className="tile__meta">
            <h1 className="tile__title">{title}</h1>
            <p className="tile__tagline">{fields.tagline || fields.subTitle}</p>
          </div>

          <img
            src={contentfulImageUrl(coverImage.url, '400', '400', 'fill')}
            alt={coverImage.description || `${title} cover image`}
          />
        </a>
      </article>
    );
  };

  render() {
    const { blocks, title, subTitle } = this.state;

    if (!blocks) {
      return null;
    }

    return (
      <div className="home-page">
        <header role="banner" className="header header--home">
          <div className="wrapper">
            <h1 className="header__title">{title}</h1>
            <h2 className="header__subtitle">{subTitle}</h2>
          </div>
        </header>

        <section className="home-page__gallery">
          {blocks.map(this.renderGalleryBlock)}
        </section>

        <section className="container container--sponsors">
          <div className="wrapper">
            <div className="container__block">
              {/*
                Workaround for this jsx-a11y bug https://git.io/fN814.
                @TODO: Update once the eslint-config package is updated (https://git.io/fjejY).
               */}
              {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
              <h4>Sponsors</h4>
              <ul>
                {sponsorList.map(sponsor => (
                  <li key={sponsor.name}>
                    <img
                      src={contentfulImageUrl(sponsor.image, '125', '40')}
                      title={sponsor.name}
                      alt={sponsor.name}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default HomePage;
