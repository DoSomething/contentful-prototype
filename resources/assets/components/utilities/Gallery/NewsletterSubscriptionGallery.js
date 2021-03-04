import React from 'react';

import NewsletterSubscriptionCard from '../NewsletterSubscriptionCard/NewsletterSubscriptionCard';

const NewsletterSubscriptionGallery = () => (
  <div className="newsletter-gallery mt-0 gap-8 grid grid-cols-1 md:grid-cols-2 xxl:grid-cols-4">
    <NewsletterSubscriptionCard topic="community" />

    <NewsletterSubscriptionCard topic="news" />

    <NewsletterSubscriptionCard topic="lifestyle" />

    <NewsletterSubscriptionCard topic="scholarships" />
  </div>
);

export default NewsletterSubscriptionGallery;
