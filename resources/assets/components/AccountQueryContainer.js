import { connect } from 'react-redux';

import AccountQuery from './AccountQuery';

const mapStateToProps = state => ({
  userId: String(state.user.id),
});

export default connect(mapStateToProps)(AccountQuery);
