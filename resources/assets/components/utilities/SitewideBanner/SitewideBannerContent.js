import React from 'react';
import PropTypes from 'prop-types';

import PrimaryButton from '../Button/PrimaryButton';
import CloseButton from '../../artifacts/CloseButton/CloseButton';
import {
  EVENT_CATEGORIES,
  trackAnalyticsEvent,
} from '../../../helpers/analytics';

const SitewideBannerContent = ({
  cta,
  description,
  handleClose,
  handleComplete,
  link,
}) => {
  const handleCompleteWithTracking = () => {
    handleComplete();

    trackAnalyticsEvent('clicked_call_to_action_sitewide_banner', {
      action: 'button_clicked',
      category: EVENT_CATEGORIES.siteAction,
      label: 'sitewide_banner',
      context: { contextSource: 'voter_registration' },
    });
  };
  return (
    <div className="w-full md:flex md:justify-center bg-yellow-500 p-8 pb-4 sm:px-10 z-50">
      <CloseButton
        callback={handleClose}
        className="block absolute right-0 top-0 p-4"
        size="14px"
      />
      <div className="md:flex items-center text-center">
        {/* m-4 md:mx-6 md:my-2 */}
        <h1 className="mb-4 md:mb-0 md:mr-4 text-center text-base">
          {description}
        </h1>

        <PrimaryButton
          attributes={{ rel: 'noopener noreferrer', target: '_blank' }}
          className="py-2 px-4"
          href={link}
          onClick={handleCompleteWithTracking}
          text={cta}
        />
      </div>
    </div>
  );
};

SitewideBannerContent.propTypes = {
  cta: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleComplete: PropTypes.func.isRequired,
  link: PropTypes.string.isRequired,
};

export default SitewideBannerContent;
