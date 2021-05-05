import React from 'react';
import PropTypes from 'prop-types';

import rewards from './rewards.svg';
import scholarships from './scholarships.svg';
import volunteerHours from './volunteer-hours.svg';
import benefitsContent from './benefits-content.json';

const images = {
  rewards,
  scholarships,
  volunteerHours,
};

const BenefitCard = ({
  showcaseTitle,
  showcaseDescription,
  callToAction,
  image,
  path,
}) => (
  <article
    className="flex flex-col h-full relative text-left"
    data-testid="benefits-card"
  >
    <a href={path} className="block">
      <img src={images[image]} alt="" />
    </a>

    <div className="bg-white flex flex-col flex-grow">
      <h1 className="mb-2 text-base pt-3">{showcaseTitle}</h1>

      <p className="flex-grow">{showcaseDescription}</p>

      <a href={path} className="pt-2">
        {callToAction}
      </a>
    </div>
  </article>
);

BenefitCard.propTypes = {
  showcaseTitle: PropTypes.string.isRequired,
  showcaseDescription: PropTypes.string.isRequired,
  callToAction: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

const BenefitsGallery = () => (
  <ul
    className="gap-8 grid grid-cols-1 md:grid-cols-2 xxl:grid-cols-3"
    data-testid="benefits-gallery"
  >
    {benefitsContent.map(benefit => (
      <li>
        <BenefitCard {...benefit} />
      </li>
    ))}
  </ul>
);

export default BenefitsGallery;
