import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Navigation, NavigationLink } from '../components/Navigation';
import { paths } from '../helpers/navigation';

const mapStateToProps = state => ({
  pages: state.campaign.pages,
});

const NavigationContainer = ({ pages }) => {
  // Create links for additional "content" pages on this campaign in Contentful.
  const additionalPages = pages.map(page => (
    <NavigationLink key={page.id} to={`${paths.pages}${page.fields.slug}`}>
      {page.fields.title}
    </NavigationLink>
  ));

  return (
    <Navigation>
      <NavigationLink to={paths.community}>Community</NavigationLink>
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

export default connect(mapStateToProps)(NavigationContainer);
