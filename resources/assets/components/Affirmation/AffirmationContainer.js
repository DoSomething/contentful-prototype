import { connect } from 'react-redux';
import Affirmation from './Affirmation';

const mapStateToProps = state => ({
  content: state.campaign.affirmation,
});

export default connect(mapStateToProps)(Affirmation);
