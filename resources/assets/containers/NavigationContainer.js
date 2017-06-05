import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Navigation, NavigationLink } from '../components/Navigation';
import { paths } from '../helpers/navigation';

const mapStateToProps = state => ({
  pages: state.campaign.pages,
  pathname: state.routing.location.pathname,
});

const NavigationContainer = ({ pages }) => {
  // Create links for additional "content" pages on this campaign in Contentful.
  const additionalPages = pages.map((page) => {
    const path = `${paths.pages}${page.fields.slug}`;
    return <NavigationLink key={page.id} to={path}>{page.fields.title}</NavigationLink>;
  });

  return (
    <Navigation>
      <NavigationLink to={paths.community} exact>Community</NavigationLink>
      <NavigationLink to={paths.action}>Action</NavigationLink>
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

export default withRouter(connect(mapStateToProps)(NavigationContainer));
