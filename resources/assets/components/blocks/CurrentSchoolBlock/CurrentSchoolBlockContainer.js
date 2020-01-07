import { connect } from 'react-redux';

import CurrentSchoolBlock from './CurrentSchoolBlock';
import { getUserId } from '../../../selectors/user';

const mapStateToProps = state => ({
  userId: getUserId(state),
});

export default connect(mapStateToProps)(CurrentSchoolBlock);
