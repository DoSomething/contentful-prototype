import { connect } from 'react-redux';
import QuizPage from './QuizPage';

const mapStateToProps = state => ({
  quizzes: state.quizzes.items,
});

export default connect(mapStateToProps)(QuizPage);
