import { connect } from 'react-redux';

import AccountQuery from './AccountQuery';
import { getUserId } from '../../../selectors/user';

const mapStateToProps = state => ({
  userId: getUserId(state),
});

export default connect(mapStateToProps)(AccountQuery);
