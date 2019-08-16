import { connect } from 'react-redux';

import { getUserId } from '../../../../selectors/user';
import AlphaPage from './AlphaPage';

const mapStateToProps = state => ({
  userId: getUserId(state),
});

export default connect(mapStateToProps)(AlphaPage);
