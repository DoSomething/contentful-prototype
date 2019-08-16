import { connect } from 'react-redux';

import CTARegisterBanner from './CTARegisterBanner';
import { redirectToNorthstar } from '../../../helpers';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = state => ({
  redirectToNorthstar: () => redirectToNorthstar(state),
});

/**
 * Export the container component.
 */
export default connect(mapStateToProps)(CTARegisterBanner);
