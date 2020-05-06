import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const PrivacyLanguage = ({ className }) => (
  <p className={classnames('text-gray-600 text-sm', className)}>
    The data you submit in this form will be handled in accordance with the
    DoSomething website{' '}
    <a
      className="text-gray-600 hover:text-gray-500"
      href="/us/about/privacy-policy"
      target="_blank"
      rel="noopener noreferrer"
    >
      privacy policy
    </a>
    . It will be reviewed by a DoSomething staff member.
  </p>
);

PrivacyLanguage.propTypes = {
  className: PropTypes.string,
};

PrivacyLanguage.defaultProps = {
  className: null,
};

export default PrivacyLanguage;
