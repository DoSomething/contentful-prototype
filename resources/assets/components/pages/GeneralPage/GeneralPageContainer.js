import { connect } from 'react-redux';

import GeneralPage from './GeneralPage';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  title: state.page.title,
  subTitle: state.page.subTitle,
  blocks: state.page.blocks,
});

// Export the container component.
export default connect(mapStateToProps)(GeneralPage);
