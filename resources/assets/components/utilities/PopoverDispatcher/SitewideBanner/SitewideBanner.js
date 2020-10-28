import React from 'react';
import PropTypes from 'prop-types';

import {
  EVENT_CATEGORIES,
  trackAnalyticsEvent,
} from '../../../../helpers/analytics';
import PrimaryButton from '../../Button/PrimaryButton';
import CloseButton from '../../../artifacts/CloseButton/CloseButton';

const SitewideBannerContent = ({
  cta,
  contextSource,
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
      context: { contextSource },
    });
  };
  return (
    <div
      className="w-full md:flex md:justify-center bg-yellow-500 p-8 pb-4 md:pt-4 sm:px-10 z-50"
      data-testid="sitewide-banner"
    >
      <CloseButton
        callback={handleClose}
        className="block absolute right-0 top-0 p-4"
        size="14px"
      />
      <div className="md:flex items-center text-center">
        <h1 className="mb-4 md:mb-0 md:mr-4 text-center text-base">
          {description}
        </h1>

        <PrimaryButton
          attributes={{
            rel: 'noopener noreferrer',
            target: '_blank',
            'data-testid': 'sitewide-banner-button',
          }}
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
  contextSource: PropTypes.string,
  description: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleComplete: PropTypes.func.isRequired,
  link: PropTypes.string.isRequired,
};

SitewideBannerContent.defaultProps = {
  contextSource: 'voter_registration',
};

export default SitewideBannerContent;
