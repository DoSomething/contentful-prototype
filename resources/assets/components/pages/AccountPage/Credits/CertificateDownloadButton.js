import React from 'react';
import { pdf } from '@react-pdf/renderer';

import CertificateTemplate, {
  certificatePostType,
} from './CertificateTemplate';

const CertificateDownloadButton = ({ certificatePost }) => {
  const handleClick = () => {
    // Render the certificate template as a PDF in Blob data form.
    pdf(<CertificateTemplate certificatePost={certificatePost} />)
      .toBlob()
      .then(blob => {
        // Create a phantom <a> tag to download the certificate for the user.
        const phantomDownloadLink = document.createElement('a');
        // Assign the generated PDF blob data as the download link.
        phantomDownloadLink.href = URL.createObjectURL(blob);
        // Assign the certificate file name.
        phantomDownloadLink.download =
          // @TODO: Update filename to include campaign title and exclude 'credit'.
          'dosomething-volunteer-credit-certificate.pdf';

        // 'Click' the link to trigger the download.
        phantomDownloadLink.click();
      })
      .catch(() => {
        // Report error, update button error state.
      });
  };

  const { pending } = certificatePost;

  // @TODO Handle loading and error state.
  return (
    // @TODO: Use one of our in-house button components.
    <button
      type="button"
      disabled={pending}
      className="btn w-full py-4 text-lg bg-blue-500 hover:bg-blue-300 active:no-outline"
      onClick={() => !pending && handleClick()}
    >
      {pending ? 'Pending' : 'Download'}
    </button>
  );
};

CertificateDownloadButton.propTypes = {
  certificatePost: certificatePostType.isRequired,
};

export default CertificateDownloadButton;
