import React from 'react';
import PropTypes from 'prop-types';

import NotFound from '../NotFound';
import SiteFooter from '../utilities/SiteFooter/SiteFooter';
import SiteNavigation from '../SiteNavigation/SiteNavigation';

const NotFoundPage = ({ id }) => (
  <>
    <SiteNavigation />

    <main className="px-3 py-20" data-testid="not-found-page">
      <NotFound id={id} className="max-w-xl mx-auto mb-8" />
    </main>

    <SiteFooter />
  </>
);

NotFoundPage.propTypes = {
  id: PropTypes.string,
};

NotFoundPage.defaultProps = {
  id: null,
};

export default NotFoundPage;
