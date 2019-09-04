import { connect } from 'react-redux';

import EmbedBlock from './EmbedBlock';
import { getUserId } from '../../../selectors/user';

const mapStateToProps = state => ({
  userId: getUserId(state),
});

export default connect(mapStateToProps)(EmbedBlock);
