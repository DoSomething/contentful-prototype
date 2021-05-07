import React from 'react';

import {
  trackAnalyticsEvent,
  EVENT_CATEGORIES,
  getPageContext,
} from '../../helpers/analytics';

const topSearches = [
  { searchTerm: 'scholarships', path: '/us/about/easy-scholarships' },
  { searchTerm: 'bullying', path: '/us/search?query=bullying' },
  { searchTerm: 'animals', path: '/us/search?query=animals' },
  { searchTerm: 'covid', path: '/us/collections/corona-virus-campaigns' },
  {
    searchTerm: 'volunteering',
    path: '/us/articles/volunteer-opportunities-for-teens',
  },
];

const TopSearchesList = () => (
  <div className="top-searches">
    <h1>Top Searches</h1>

    <ul className="top-searches__link-list">
      {topSearches.map(({ searchTerm, path }) => (
        <li key={searchTerm}>
          <a
            href={path}
            onClick={() =>
              trackAnalyticsEvent(
                `clicked_subnav_link_${searchTerm}_top_search`,
                {
                  action: 'link_clicked',
                  category: EVENT_CATEGORIES.navigation,
                  label: `${searchTerm}_top_search`,
                  context: getPageContext(),
                },
              )
            }
          >
            {searchTerm}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export default TopSearchesList;
