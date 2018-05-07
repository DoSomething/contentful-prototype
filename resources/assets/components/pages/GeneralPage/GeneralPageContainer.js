import { connect } from 'react-redux';
import { find } from 'lodash';

import GeneralPage from './GeneralPage';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = (state, ownProps) => {
  // @todo This setup is temporary to test general pages
  // this container should just be fetching the props from state
  const subPage = find(
    state.campaign.pages,
    page =>
      page.type === 'page'
        ? page.fields.slug.endsWith(ownProps.match.params.slug)
        : false,
  );

  if (!subPage) {
    return null;
  }

  const { title, subTitle, blocks } = subPage.fields;

  return {
    title,
    subTitle,
    blocks,
  };
};

// Export the container component.
export default connect(mapStateToProps)(GeneralPage);
