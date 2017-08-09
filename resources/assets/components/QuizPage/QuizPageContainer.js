import { connect } from 'react-redux';
import QuizPage from './QuizPage';

const mapStateToProps = (state, ownProps) => ({
  quizId: ownProps.match.params.id,
});

export default connect(mapStateToProps)(QuizPage);
