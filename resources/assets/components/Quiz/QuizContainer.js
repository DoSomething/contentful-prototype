import { connect } from 'react-redux';
import { PuckConnector } from '@dosomething/puck-client';

import Quiz from './Quiz';

export default connect()(PuckConnector(Quiz));
