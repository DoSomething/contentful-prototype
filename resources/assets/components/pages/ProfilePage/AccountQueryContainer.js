import { connect } from 'react-redux';

import AccountQuery from './AccountQuery';
import { getUserId } from '../../../selectors/user';

const mapStateToProps = state => ({
  userId: '5709bd59469c6455168b47b8',
});

export default connect(mapStateToProps)(AccountQuery);
