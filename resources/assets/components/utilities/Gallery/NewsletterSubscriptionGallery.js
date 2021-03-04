import React from 'react';

import { NEWSLETTER_TOPICS } from '../NewsletterSubscriptionCard/config';
import NewsletterSubscriptionCard from '../NewsletterSubscriptionCard/NewsletterSubscriptionCard';

const NewsletterSubscriptionGallery = () => (
  <div className="newsletter-gallery mt-0 gap-8 grid grid-cols-1 md:grid-cols-2 xxl:grid-cols-4">
    <NewsletterSubscriptionCard topic={NEWSLETTER_TOPICS.community} />

    <NewsletterSubscriptionCard topic={NEWSLETTER_TOPICS.news} />

    <NewsletterSubscriptionCard topic={NEWSLETTER_TOPICS.lifestyle} />

    <NewsletterSubscriptionCard topic={NEWSLETTER_TOPICS.scholarships} />
  </div>
);

export default NewsletterSubscriptionGallery;
