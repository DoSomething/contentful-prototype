import { connect } from 'react-redux';

import GeneralPage from './GeneralPage';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => {
  const { title, subTitle, blocks } = state.page.fields;

  return {
    title,
    subTitle,
    blocks,
  };
};

// Export the container component.
export default connect(mapStateToProps)(GeneralPage);
