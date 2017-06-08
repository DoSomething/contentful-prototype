import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TabbedNavigation from '../components/Navigation/TabbedNavigation';
import NavigationLink from '../components/Navigation/NavigationLink';
import { paths } from '../helpers/navigation';

const mapStateToProps = state => ({
  pages: state.campaign.pages,
  pathname: state.routing.location.pathname,
});

const TabbedNavigationContainer = ({ pages }) => {
  // Create links for additional "content" pages on this campaign in Contentful.
  const additionalPages = pages.map((page) => {
    const path = `${paths.pages}${page.fields.slug}`;
    return (
      <NavigationLink key={page.id} to={path}>{page.fields.title}</NavigationLink>
    );
  });

  return (
    <TabbedNavigation>
      <NavigationLink to={paths.community} exact>Community</NavigationLink>
      <NavigationLink to={paths.action}>Action</NavigationLink>
      { additionalPages }
    </TabbedNavigation>
  );
};

TabbedNavigationContainer.propTypes = {
  pages: PropTypes.array,  // eslint-disable-line react/forbid-prop-types
};

TabbedNavigationContainer.defaultProps = {
  pages: [],
};

export default withRouter(connect(mapStateToProps)(TabbedNavigationContainer));
