import React from 'react';
import classNames from 'classnames';
import { PDFDownloadLink } from '@react-pdf/renderer';

import CertificateTemplate, {
  certificatePostType,
} from './CertificateTemplate';

// The certificate PDF Download button with pending/ready state.
const buttonClassNames = 'btn w-full py-4 text-lg';
const CertificateDownloadButton = ({ certificatePost }) =>
  certificatePost.pending ? (
    <button type="button" disabled className={buttonClassNames}>
      Pending
    </button>
  ) : (
    <PDFDownloadLink
      document={<CertificateTemplate certificatePost={certificatePost} />}
      fileName="dosomething-volunteer-credit-certificate.pdf"
      className={classNames(
        buttonClassNames,
        'hover:bg-blue-300 hover:no-underline hover:text-white',
      )}
    >
      Download
    </PDFDownloadLink>
  );

CertificateDownloadButton.propTypes = {
  certificatePost: certificatePostType.isRequired,
};

export default CertificateDownloadButton;
