import React from 'react';
import PropTypes from 'prop-types';

const EmailSubscriptionCheckbox = props => (
  <div className="padded">
    <label className="option -checkbox" htmlFor="email_topics">
      <input
        type="checkbox"
        name={props.identifier}
        defaultChecked={
          props.userTopics ? props.userTopics.includes(props.identifier) : false
        }
        className="form-checkbox"
        onChange={props.onChange}
      />
      <span className="option__indicator" />
      {/* Workaround for this jsx-a11y bug https://git.io/fN814 */}
      {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
      <h4>{props.title}</h4>
      <p>{props.description}</p>
    </label>
  </div>
);

EmailSubscriptionCheckbox.propTypes = {
  identifier: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  userTopics: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default EmailSubscriptionCheckbox;
