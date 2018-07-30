import { connect } from 'react-redux';

import ProfileQuery from './ProfileQuery';
import { getUserId } from '../../../selectors/user';

const mapStateToProps = state => ({
  userId: getUserId(state),
});

export default connect(mapStateToProps)(ProfileQuery);
