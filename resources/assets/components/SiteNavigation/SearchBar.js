import React, { useState } from 'react';

import SearchIcon from '../artifacts/SearchIcon/SearchIcon';
import {
  trackAnalyticsEvent,
  EVENT_CATEGORIES,
  getPageContext,
} from '../../helpers/analytics';

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState('');

  return (
    <form
      className="search"
      id="utility-subnav__search"
      acceptCharset="UTF-8"
      action="/us/search"
      method="GET"
      onSubmit={() =>
        trackAnalyticsEvent('submitted_nav_form_search_subnav', {
          action: 'form_submitted',
          category: EVENT_CATEGORIES.search,
          label: 'search_subnav',
          context: { searchQuery: searchInput, ...getPageContext() },
        })
      }
    >
      <SearchIcon />

      <input
        type="search"
        placeholder="Search"
        name="query"
        // Users are clicking into the SearchBar manually so context is accessible. We can thus autofocus for convenience:
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
        onChange={event => setSearchInput(event.target.value)}
        onClick={() =>
          trackAnalyticsEvent('clicked_nav_form_search_subnav', {
            action: 'form_clicked',
            category: EVENT_CATEGORIES.search,
            label: 'search_subnav',
            context: getPageContext(),
          })
        }
        value={searchInput}
      />
    </form>
  );
};

export default SearchBar;
