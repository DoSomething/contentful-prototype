import React from 'react';

import NotFound from '../NotFound';
import SiteNavigationContainer from '../SiteNavigation/SiteNavigationContainer';

const NotFoundPage = () => (
  <>
    <SiteNavigationContainer />

    <main role="main" className="py-20">
      <NotFound className="max-w-xl mx-auto mb-8" />
    </main>
  </>
);

export default NotFoundPage;
