import React from 'react';

import NotFound from '../NotFound';
import SiteFooter from '../utilities/SiteFooter/SiteFooter';
import SiteNavigationContainer from '../SiteNavigation/SiteNavigationContainer';

const NotFoundPage = () => (
  <>
    <SiteNavigationContainer />

    <main role="main" className="py-20 relative">
      <article class="not-found-page">
        <NotFound className="max-w-xl mx-auto mb-8" />
      </article>
    </main>

    <SiteFooter />
  </>
);

export default NotFoundPage;
