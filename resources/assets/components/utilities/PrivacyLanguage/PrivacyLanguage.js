import React from 'react';

const PrivacyLanguage = () => {
  const privacyLanguage = (
    <p className="footnote padding-horizontal-md padding-bottom-md">
      The data you submit in this form will be handled in accordance with the
      DoSomething website{' '}
      <a
        href="/us/about/privacy-policy"
        target="_blank"
        rel="noopener noreferrer"
      >
        privacy policy
      </a>
      . It will be reviewed by a DoSomething staff member.
    </p>
  );

  return privacyLanguage;
};

export default PrivacyLanguage;
