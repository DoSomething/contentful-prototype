import React from 'react';
import './notification.scss';

const Notification = ({ message, style, remove }) => (
  <div className={`notification -${style}`}>
    <div className='notification__content'>
      <p>{ message }</p>
    </div>
    <span className='notification__close' onClick={ remove }>&times;</span>
  </div>
);

Notification.defaultProps = {
  message: null,
  style: 'error',
};

export const NotificationList = ({ notifications, removeNotification }) => (
  <div className='notification-list'>
    {notifications.map(({ message, style }, index) => (
      <Notification
        key={index}
        message={message}
        style={style}
        close={() => removeNotification(index)} />
    ))}
  </div>
);

NotificationList.defaultProps = {
  notifications: [],
}

export default NotificationList;
