import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';

import Enclosure from '../../Enclosure';
import SiteNavigationContainer from '../../SiteNavigation/SiteNavigationContainer';
import ContentfulEntryLoader from '../../utilities/ContentfulEntryLoader/ContentfulEntryLoader';

/**
 * Render the block page.
 *
 * @returns {ReactElement}
 */
const BlockPage = ({ match }) => (
  <>
    <SiteNavigationContainer />

    <div className="main clearfix">
      <Enclosure className="md:w-3/4 mx-auto my-16 px-3">
        <ContentfulEntryLoader id={match.params.id} />
      </Enclosure>
    </div>
  </>
);

BlockPage.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

export default BlockPage;
