import React from 'react';
import PropTypes from 'prop-types';

import {
  NEWSLETTER_BANNERS,
  NEWSLETTER_TEXT,
  NEWSLETTER_TOPICS,
} from './config';

const NewsletterSubscriptionCard = ({
  children,
  description,
  subtitle,
  title,
  topic,
}) => {
  const banner = NEWSLETTER_BANNERS[topic];
  const text = NEWSLETTER_TEXT[topic];

  return (
    <article className="flex flex-col h-full text-left">
      <div>
        <img
          src={banner}
          alt={`${
            title ? title.toLowerCase() : text.title.toLocaleLowerCase()
          } newsletter logo`}
        />
      </div>

      <div className="bg-white border-b-2 border-l-2 border-r-2 border-gray-300 border-solid flex flex-col flex-grow p-4 rounded-b">
        <h1 className="mb-1 text-base">{title || text.title}</h1>

        <h2 className="italic mb-6 text-base">{subtitle || text.subtitle}</h2>

        <p className="flex-grow">{description || text.description}</p>

        {children}
      </div>
    </article>
  );
};

NewsletterSubscriptionCard.propTypes = {
  children: PropTypes.element,
  description: PropTypes.string,
  subtitle: PropTypes.string,
  topic: PropTypes.oneOf(Object.keys(NEWSLETTER_TOPICS)).isRequired,
  title: PropTypes.string,
};

NewsletterSubscriptionCard.defaultProps = {
  children: null,
  description: null,
  subtitle: null,
  title: null,
};

export default NewsletterSubscriptionCard;
