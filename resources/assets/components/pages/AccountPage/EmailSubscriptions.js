import React from 'react';
import PropTypes from 'prop-types';

import NewsletterImages from './NewsletterImages';
import EmailSubscriptionItem from './EmailSubscriptionItem';

const EmailSubscriptions = () => (
  <div className="gallery-grid gallery-grid-quartet">
    <EmailSubscriptionItem
      topic="COMMUNITY"
      name="What You're Doing"
      image={NewsletterImages.CommunityNewsletter}
      description="A roundup of photos, writing, and stories of impact from the DoSomething community and members like you."
    />
    <EmailSubscriptionItem
      topic="NEWS"
      name="The Breakdown"
      image={NewsletterImages.NewsNewsletter}
      description="Don’t just read the news…*change* the news. Our current events newsletter has headlines, along with immediate ways to impact them."
    />
    <EmailSubscriptionItem
      topic="LIFESTYLE"
      name="The Boost"
      image={NewsletterImages.LifestyleNewsletter}
      description="Stories of incredible young people, actionable how-tos, inspirational playlists, and other content to live your best life and help others do the same."
    />
    <EmailSubscriptionItem
      topic="SCHOLARSHIPS"
      name="Pays to Do Good"
      image={NewsletterImages.ScholarshipNewsletter}
      description="Alerts on new ways to earn scholarships by doing social good, plus announcements of scholarship winners."
    />
  </div>
);

EmailSubscriptions.propTypes = {
  user: PropTypes.shape({
    emailSubscriptionTopics: PropTypes.array,
    id: PropTypes.string,
  }).isRequired,
};

export default EmailSubscriptions;
