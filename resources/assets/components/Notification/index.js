import React from 'react';
import { makeHash } from '../../helpers';

import './notification.scss';

const Notification = ({ message, style, remove }) => (
  <div className={`notification -${style}`}>
    <div className="notification__content">
      <p>{ message }</p>
    </div>
    <button className="notification__close" onClick={remove}>&times;</button>
  </div>
);

Notification.propTypes = {
  message: React.PropTypes.string,
  style: React.PropTypes.string,
  remove: React.PropTypes.func.isRequired,
};

Notification.defaultProps = {
  message: 'Agh, looks like we had an error. Try again in a few minutes!',
  style: 'error',
};

const NotificationList = ({ notifications, removeNotification }) => (
  <div className="notification-list">
    {notifications.map(({ message, style }, index) => (
      <Notification
        key={makeHash(message)}
        message={message}
        style={style}
        remove={() => removeNotification(index)}
      />
    ))}
  </div>
);

NotificationList.propTypes = {
  notifications: React.PropTypes.arrayOf(React.PropTypes.object),
  removeNotification: React.PropTypes.func.isRequired,
};

NotificationList.defaultProps = {
  notifications: [],
};

export default NotificationList;
