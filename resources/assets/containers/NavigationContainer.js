import React from 'react';
import { Navigation, NavigationLink } from '../components/Navigation';
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  pages: state.campaign.pages,
});

const NavigationContainer = (props) => {
  // Create links for additional "content" pages on this campaign in Contentful.
  const additionalPages = props.pages.map(page => (
    <NavigationLink key={page.id} to={'/pages/' + page.fields.slug}>
      {page.fields.title}
    </NavigationLink>
  ));

  return (
    <Navigation>
      <NavigationLink to="/">Community</NavigationLink>
      <NavigationLink to="/action">Action</NavigationLink>
      { additionalPages }
    </Navigation>
  );
};

export default connect(mapStateToProps)(NavigationContainer);
