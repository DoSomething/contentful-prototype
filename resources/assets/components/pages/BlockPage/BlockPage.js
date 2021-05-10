import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import SiteFooter from '../../utilities/SiteFooter/SiteFooter';
import SiteNavigation from '../../SiteNavigation/SiteNavigation';
import ContentfulEntryLoader from '../../utilities/ContentfulEntryLoader/ContentfulEntryLoader';

/**
 * Render the block page.
 *
 * @returns {ReactElement}
 */
const BlockPage = ({ match, hideNavigation }) => (
  <>
    {!hideNavigation ? <SiteNavigation /> : null}

    <main className="clearfix">
      <div className="md:w-3/4 mx-auto my-16 px-3">
        <ContentfulEntryLoader id={match.params.id} />
      </div>
    </main>

    <SiteFooter />
  </>
);

BlockPage.propTypes = {
  hideNavigation: PropTypes.bool,
  match: ReactRouterPropTypes.match.isRequired,
};

BlockPage.defaultProps = {
  hideNavigation: false,
};

export default BlockPage;
