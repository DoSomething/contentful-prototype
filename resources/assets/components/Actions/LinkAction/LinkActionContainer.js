import { connect } from 'react-redux';
import { PuckConnector } from '@dosomething/puck-client';
import LinkAction from './LinkAction';

export default connect(null)(PuckConnector(LinkAction));
