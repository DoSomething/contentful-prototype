import { connect } from 'react-redux';
import Quiz from './Quiz';

const mapStateToProps = (state, ownProps) => ({
  quizId: ownProps.match.params.id,
});

export default connect(mapStateToProps)(Quiz);
