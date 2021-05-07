import React from 'react';

import {
  trackAnalyticsEvent,
  EVENT_CATEGORIES,
  getPageContext,
} from '../../helpers/analytics';

const TopSearchesList = () => (
  <div className="top-searches">
    <h1>Top Searches</h1>

    <ul className="top-searches__link-list">
      <li>
        <a
          href="/us/about/easy-scholarships"
          onClick={() =>
            trackAnalyticsEvent('clicked_subnav_link_scholarships_top_search', {
              action: 'link_clicked',
              category: EVENT_CATEGORIES.navigation,
              label: 'scholarships_top_search',
              context: getPageContext(),
            })
          }
        >
          scholarships
        </a>
      </li>

      <li>
        <a
          href="/us/search?query=bullying"
          onClick={() =>
            trackAnalyticsEvent('clicked_subnav_link_bullying_top_search', {
              action: 'link_clicked',
              category: EVENT_CATEGORIES.navigation,
              label: 'bullying_top_search',
              context: getPageContext(),
            })
          }
        >
          bullying
        </a>
      </li>

      <li>
        <a
          href="/us/search?query=animals"
          onClick={() =>
            trackAnalyticsEvent('clicked_subnav_link_animals_top_search', {
              action: 'link_clicked',
              category: EVENT_CATEGORIES.navigation,
              label: 'animals_top_search',
              context: getPageContext(),
            })
          }
        >
          animals
        </a>
      </li>

      <li>
        <a
          href="/us/collections/corona-virus-campaigns"
          onClick={() =>
            trackAnalyticsEvent('clicked_subnav_link_covid_top_search', {
              action: 'link_clicked',
              category: EVENT_CATEGORIES.navigation,
              label: 'covid_top_search',
              context: getPageContext(),
            })
          }
        >
          covid
        </a>
      </li>

      <li>
        <a
          href="/us/articles/volunteer-opportunities-for-teens"
          onClick={() =>
            trackAnalyticsEvent('clicked_subnav_link_volunteering_top_search', {
              action: 'link_clicked',
              category: EVENT_CATEGORIES.navigation,
              label: 'volunteering_top_search',
              context: getPageContext(),
            })
          }
        >
          volunteering
        </a>
      </li>
    </ul>
  </div>
);

export default TopSearchesList;
