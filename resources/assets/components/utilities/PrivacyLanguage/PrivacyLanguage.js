import React from 'react';

const PrivacyLanguage = () => (
  <p className="text-gray-600 text-sm pb-4 pt-2 px-3">
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

export default PrivacyLanguage;
