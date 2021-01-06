import { connect } from 'react-redux';

import Affirmation from './Affirmation';
import { getUserId } from '../../helpers/auth';

const mapStateToProps = () => ({
  userId: getUserId(),
});

export default connect(mapStateToProps)(Affirmation);
