/* global window */

import React from 'react';

const HomePageDashboard = () => (
  <div>
    <a
      className="button -secondary margin-md"
      href={`/next/cache/home_pages?redirect=${window.location.pathname}`}
    >
      Clear Cache
    </a>
  </div>
);

export default HomePageDashboard;
