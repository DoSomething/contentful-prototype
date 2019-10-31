import React from 'react';

import NotFound from '../NotFound';
import SiteNavigationContainer from '../SiteNavigation/SiteNavigationContainer';

const NotFoundPage = () => (
  <>
    <SiteNavigationContainer />
    <section className="container -framed mx-2">
      <NotFound />
    </section>
  </>
);

export default NotFoundPage;
