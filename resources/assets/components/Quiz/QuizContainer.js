import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { PuckConnector } from '@dosomething/puck-client';

import Quiz from './Quiz';

export default withRouter(connect()(PuckConnector(Quiz)));
