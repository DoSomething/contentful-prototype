import React from 'react';
import { Flex, FlexCell } from '../Flex';
import {
  getArray as storageGetArray,
  remove as storageRemove,
  SIGNUP_STORAGE_KEY,
} from '../../helpers/storage';
import { getSession } from '../../helpers/analytics';
import './debugger.scss';

const Debugger = (props) => {
  if (props.user.role !== 'admin') {
    return null;
  }

  return (
    <div className="debugger">
      <Flex>
        <FlexCell width="one-third">
          <div>
            <h1>analytics debug</h1>
            <p>Device Id: <span>{ getSession().deviceId }</span></p>
            <p>Session Id: <span>{ getSession().id }</span></p>
            <p>Last Updated: <span>{ new Date(getSession().lastUpdatedAt).toString() }</span></p>
          </div>
        </FlexCell>
        <FlexCell width="one-third">
          <div>
            <h1>signups storage</h1>
            <p>local storage signups: <span>{ storageGetArray(props.user.id, SIGNUP_STORAGE_KEY).join(',') }</span></p>
            <p>redux store signups: <span>{ props.signups.join(',') }</span></p>
            <button className="button" onClick={() => storageRemove(props.user.id, SIGNUP_STORAGE_KEY)}>clear signup cache</button>
          </div>
        </FlexCell>
      </Flex>
    </div>
  );
};

Debugger.propTypes = {
  signups: React.PropTypes.arrayOf(React.PropTypes.string),
  user: React.PropTypes.shape({
    id: React.PropTypes.string,
    role: React.PropTypes.string,
  }).isRequired,
};

Debugger.defaultProps = {
  signups: [],
  user: {
    id: null,
    role: 'anonymous',
  },
};

export default Debugger;
