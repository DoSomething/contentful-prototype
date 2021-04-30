import React from 'react';
import PropTypes from 'prop-types';

import LegacyNewsletterImages from './LegacyNewsletterImages';
import LegacyEmailSubscriptionItem from './LegacyEmailSubscriptionItem';

const LegacyEmailSubscriptions = () => (
  <div className="gallery-grid gallery-grid-quartet my-6 -mx-3">
    <LegacyEmailSubscriptionItem
      attributes={{ 'data-testid': 'community-newsletter-subscription' }}
      topic="COMMUNITY"
      name="What You're Doing"
      image={LegacyNewsletterImages.CommunityNewsletter}
      descriptionHeader="Sent every Tuesday"
      description="A roundup of photos, writing, and stories of impact from the DoSomething community and members like you."
    />
    <LegacyEmailSubscriptionItem
      attributes={{ 'data-testid': 'news-newsletter-subscription' }}
      topic="NEWS"
      name="The Breakdown"
      image={LegacyNewsletterImages.NewsNewsletter}
      descriptionHeader="Sent every Wednesday"
      description="Don’t just read the news…*change* the news. Our current events newsletter has headlines, along with immediate ways to impact them."
    />
    <LegacyEmailSubscriptionItem
      attributes={{ 'data-testid': 'lifestyle-newsletter-subscription' }}
      topic="LIFESTYLE"
      name="The Boost"
      image={LegacyNewsletterImages.LifestyleNewsletter}
      descriptionHeader="Sent every Thursday"
      description="Stories of incredible young people, actionable how-tos, inspirational playlists, and other content to live your best life and help others do the same."
    />
    <LegacyEmailSubscriptionItem
      attributes={{ 'data-testid': 'scholarships-newsletter-subscription' }}
      topic="SCHOLARSHIPS"
      name="Pays to Do Good"
      image={LegacyNewsletterImages.ScholarshipNewsletter}
      descriptionHeader="Sent monthly every first Friday"
      description="Alerts on new ways to earn scholarships by doing social good, plus announcements of scholarship winners."
    />
  </div>
);

LegacyEmailSubscriptions.propTypes = {
  user: PropTypes.shape({
    emailSubscriptionTopics: PropTypes.arrayOf(PropTypes.string),
    id: PropTypes.string,
  }).isRequired,
};

export default LegacyEmailSubscriptions;
