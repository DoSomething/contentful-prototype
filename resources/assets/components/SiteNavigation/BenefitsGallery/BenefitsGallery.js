import React from 'react';
import PropTypes from 'prop-types';

import rewards from './rewards.svg';
import scholarships from './scholarships.svg';
import volunteer from './volunteer-hours.svg';
import benefitsContent from './benefits-content.json';
import {
  trackAnalyticsEvent,
  EVENT_CATEGORIES,
  getPageContext,
} from '../../../helpers/analytics';

const images = {
  rewards,
  scholarships,
  volunteer,
};

const BenefitCard = ({
  showcaseTitle,
  showcaseDescription,
  callToAction,
  category,
  path,
}) => {
  const handleClick = type =>
    trackAnalyticsEvent(`clicked_subnav_link_benefits_${type}`, {
      category: EVENT_CATEGORIES.navigation,
      action: 'link_clicked',
      label: `benefits_${type}`,
      context: {
        ...getPageContext(),
      },
    });

  return (
    <article
      className="flex flex-col h-full relative text-left"
      data-testid="benefits-card"
    >
      <a href={path} className="block" onClick={() => handleClick(category)}>
        <img src={images[category]} alt="" />
      </a>

      <div className="bg-white flex flex-col flex-grow">
        <h1 className="mb-2 text-base pt-3">{showcaseTitle}</h1>

        <p className="flex-grow">{showcaseDescription}</p>

        <a href={path} className="pt-2" onClick={() => handleClick(category)}>
          {callToAction}
        </a>
      </div>
    </article>
  );
};
BenefitCard.propTypes = {
  showcaseTitle: PropTypes.string.isRequired,
  showcaseDescription: PropTypes.string.isRequired,
  callToAction: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

const BenefitsGallery = () => (
  <ul
    className="gap-8 grid grid-cols-1 md:grid-cols-2 xxl:grid-cols-3"
    data-testid="benefits-gallery"
  >
    {benefitsContent.map(benefit => (
      <li key={benefit.category}>
        <BenefitCard {...benefit} />
      </li>
    ))}
  </ul>
);

export default BenefitsGallery;
