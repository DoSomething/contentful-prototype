import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Navigation, NavigationLink } from '../components/Navigation';

const mapStateToProps = state => ({
  pages: state.campaign.pages,
  pathname: state.routing.location.pathname,
});

const NavigationContainer = ({ pages, pathname }) => {
  // Create links for additional "content" pages on this campaign in Contentful.
  const additionalPages = pages.map(page => {
    const path = `/pages/${page.fields.slug}`
    return (
      <NavigationLink key={page.id} to={path} active={path === pathname}>
        {page.fields.title}
      </NavigationLink>
    );
  });

  return (
    <Navigation>
      <NavigationLink to="/" active={'/' === pathname}>Community</NavigationLink>
      <NavigationLink to="/action" active={'/action' === pathname}>Action</NavigationLink>
      { additionalPages }
    </Navigation>
  );
};

NavigationContainer.propTypes = {
  pages: PropTypes.array,  // eslint-disable-line react/forbid-prop-types
};

NavigationContainer.defaultProps = {
  pages: [],
};

export default connect(mapStateToProps)(NavigationContainer);
