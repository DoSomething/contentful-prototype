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
  message: 'Agh, looks like we had an error. Try again in a few minutes!',
  style: 'error',
};

const NotificationList = ({ notifications, removeNotification }) => (
  <div className='notification-list'>
    {notifications.map(({ message, style }, index) => (
      <Notification
        key={index}
        message={message}
        style={style}
        remove={() => removeNotification(index)} />
    ))}
  </div>
);

NotificationList.defaultProps = {
  notifications: [],
}

export default NotificationList;
