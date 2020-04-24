import React, { useRef, useState } from 'react';
import { pdf } from '@react-pdf/renderer';

import CertificateTemplate, {
  certificatePostType,
} from './CertificateTemplate';

const CertificateDownloadButton = ({ certificatePost }) => {
  const [isPdfGenerated, setIsPdfGenerated] = useState(false);
  const pdfLink = useRef(null);

  const handleClick = () => {
    if (!isPdfGenerated) {
      setIsPdfGenerated(true);

      pdf(<CertificateTemplate certificatePost={certificatePost} />)
        .toBlob()
        .then(blob => {
          pdfLink.current.href = URL.createObjectURL(blob);
          pdfLink.current.click();
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  if (certificatePost.pending) {
    return (
      <button type="button" disabled className="btn w-full py-4 text-lg">
        Pending
      </button>
    );
  }

  // @TODO Handle loading and error state.
  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a
      role="link"
      tabIndex="0"
      download="certa.pdf"
      ref={pdfLink}
      className="btn w-full py-4 text-lg bg-blue-500 hover:bg-blue-300"
      onClick={() => handleClick()}
    >
      Download
    </a>
  );
};

CertificateDownloadButton.propTypes = {
  certificatePost: certificatePostType.isRequired,
};

export default CertificateDownloadButton;
