import React from 'react';
import PropTypes from 'prop-types';

const EmailSubscriptionCheckbox = props => (
  <div className="py-2">
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
