import React from 'react';

const PrivacyLanguage = () => {
  const privacyLanguage = (
    <p className="footnote padding-horizontal-md padding-bottom-md">
      The data you submit in this form will be handled in accordance with the
      DoSomething website{' '}
      {/*
        Workaround for this jsx-a11y bug https://git.io/fN814.
        @TODO: Update once the eslint-config package is updated (https://git.io/fjejY).
      */}
      {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
      <a
        href="https://www.dosomething.org/us/about/privacy-policy"
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
