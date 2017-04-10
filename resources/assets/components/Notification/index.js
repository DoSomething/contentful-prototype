import React from 'react';
import './notification.scss';

const Notification = ({ message, style, close }) => (
  <div className={`notification -${style}`}>
    <div className='notification__content'>
      <p>{ message }</p>
    </div>
    <span className='notification__close' onClick={ close }>&times;</span>
  </div>
);

Notification.defaultProps = {
  message: null,
  style: 'error',
  close: () => {},
};

export const NotificationList = ({ notifications, closeNotification }) => (
  <div className='notification-list'>
    {notifications.map(({ message, style }, index) => (
      <Notification
        key={index}
        message={message}
        style={style}
        close={() => closeNotification(index)} />
    ))}
  </div>
);

NotificationList.defaultProps = {
  notifications: [],
}

export default NotificationList;
