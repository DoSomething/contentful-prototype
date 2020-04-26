import { connect } from 'react-redux';

import AlphaPage from './AlphaPage';
import { getUserId } from '../../../../selectors/user';

const mapStateToProps = state => ({
  userId: getUserId(state),
});

export default connect(mapStateToProps)(AlphaPage);
